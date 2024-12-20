'use client';

import {
  Box,
  FormControl,
  MenuItem,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import {
  ChangeEvent,
  forwardRef,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import CheckIcon from '@/assets/icons/Check.svg';
import MoreIcon from '@/assets/icons/More.svg';
import SearchIcon from '@/assets/icons/SearchGlass.svg';
import { InputField } from '@/ui/atoms/InputField';
import { OptionType, BaseSelectProps } from './types';
import { Button } from '../Button';

export const BaseSelect = forwardRef<
  HTMLDivElement,
  PropsWithChildren<BaseSelectProps>
>((props, ref) => {
  const {
    children,
    multiple = false,
    options,
    defaultText,
    minWidth,
    showInput = true,
    showSearch = false,
    searchPlaceholder = 'Search',
    displayValue,
    onSearchChange,
    fetchNextPage,
    ...rest
  } = props;

  const [value, setValue] = useState<OptionType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeout = setTimeout(
      () => searchFieldRef.current?.querySelector('input')?.focus(),
      0,
    );

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const customChange = (event: SelectChangeEvent<unknown>) => {
    rest.onChange?.(event);
    setValue(event.target.value as OptionType[]);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearchChange?.(e);
  };

  const searchField = (
    <InputField
      ref={searchFieldRef}
      value={searchTerm}
      onChange={handleSearch}
      onKeyDown={(e) => e.stopPropagation()}
      fullWidth
      placeholder={searchPlaceholder}
      sx={{ mb: 2 }}
      slotProps={{
        input: {
          startAdornment: (
            <Box
              sx={{
                pl: 1,
                color: 'var(--slate-500)',
                display: 'flex',
                alignItems: 'center',
              }}>
              <SearchIcon width={14} height={14} />
            </Box>
          ),
        },
      }}
    />
  );

  return (
    <>
      <FormControl
        sx={{
          width: '100%',
          minWidth: 'unset',
          position: 'relative',
          overflow: showInput ? 'visible' : 'hidden',
          '& .MuiInputBase-root': {
            minWidth: minWidth ? `${minWidth}px !important` : undefined,
          },
          '& .MuiSelect-select': {
            pr: minWidth ? '36px !important' : undefined,
          },
        }}>
        {!showInput ? (
          <Box sx={{ color: 'var(--slate-900)' }}>
            <MoreIcon width={16} height={16} />
          </Box>
        ) : null}

        <Box
          sx={{
            opacity: showInput ? 1 : 0,
            position: showInput ? 'static' : 'absolute',
            top: 0,
            right: 0,
            zIndex: 10,
            p: showInput ? 0 : '1px',
          }}>
          <InputField
            ref={ref}
            value={value}
            select
            defaultText={defaultText}
            slotProps={{
              formHelperText: { component: 'div' },
              select: {
                displayEmpty: true,
                onChange: customChange,
                multiple: multiple,
                renderValue: (value) => {
                  const newValue = displayValue ?? value;

                  if (!showInput) return '';

                  const isArray = Array.isArray(newValue);

                  if (isArray && newValue.length === 0) {
                    return defaultText;
                  }

                  return (
                    <Box
                      sx={{
                        overflow: 'hidden',
                        py: 0.5,
                        my: -0.5,
                        textOverflow: 'ellipsis',
                      }}>
                      {isArray ? newValue.join(', ') : (newValue as string)}
                    </Box>
                  );
                },
                MenuProps: {
                  PaperProps: {
                    sx: {
                      display: 'flex',
                      flexDirection: 'column-reverse',
                      minWidth: showInput ? undefined : '200px !important',
                      borderRadius: '8px',
                      boxShadow: 'none',
                      border: '1px solid var(--slate-200)',
                      padding: '10px',

                      '&::-webkit-scrollbar': {
                        display: 'none',
                      },

                      '& .MuiList-root.MuiMenu-list': {
                        padding: 0,
                      },

                      '& .MuiMenuItem-root': {
                        minHeight: 40,
                      },

                      '& .MuiMenuItem-root:not(.Mui-selected) svg': {
                        opacity: 0,
                      },

                      '& .MuiButtonBase-root.MuiMenuItem-root:hover, .MuiButtonBase-root.Mui-focusVisible, .MuiButtonBase-root.Mui-selected, .MuiMenuItem-root.Mui-selected.Mui-focusVisible ':
                        {
                          background: 'var(--slate-050)',
                        },

                      '& .MuiMenuItem-root.Mui-selected  svg': {
                        opacity: 1,
                        fill: 'var(--sky-500)',
                      },

                      '& .MuiInputBase-root': {
                        minWidth: '200px !important',
                      },
                    },
                  },
                },
              },
            }}
            {...rest}>
            {showSearch ? searchField : null}

            {(onSearchChange
              ? options
              : options.filter(
                  (option) =>
                    option.value
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    option.displayValue
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase()),
                )
            ).map((option) => {
              return (
                <MenuItem
                  disableRipple
                  value={option.value}
                  key={option.key}
                  sx={{ height: '40px', p: 0 }}>
                  <Box
                    sx={{ height: '100%' }}
                    p={'8px'}
                    display={'flex'}
                    gap={'8px'}
                    justifyContent={'space-between'}
                    alignItems={'center'}>
                    <CheckIcon
                      style={{
                        width: '16px',
                        height: '16px',
                      }}
                    />
                    <Typography variant="sm-regular">
                      {option.displayValue ?? option.value}
                    </Typography>
                  </Box>
                </MenuItem>
              );
            })}
            {fetchNextPage && (
              <Stack mt={'5px'} justifyContent={'center'} alignItems={'center'}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={fetchNextPage}>
                  Load more
                </Button>
              </Stack>
            )}
            {children}
          </InputField>
        </Box>
      </FormControl>
    </>
  );
});

BaseSelect.displayName = 'BaseSelect';
