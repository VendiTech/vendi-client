import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  Popover,
} from '@mui/material';
import MoreIcon from '@/assets/icons/More.svg';
import CrossIcon from '@/assets/icons/Cross.svg';
import ArrowIcon from '@/assets/icons/SortArrow.svg';
import { BaseSelectProps, NestedOptionType } from '../types';
import { OptionItem } from './OptionItem';
import { createNewValue } from '../helpers/createNewValue';
import { InputField } from '@/ui/atoms/InputField';
import { computeDisplayValue } from '../helpers/computeDisplayValue';
import { getPreselectedOptions } from '../helpers/getPreselectedOptions';
import SearchIcon from '@/assets/icons/SearchGlass.svg';
import { useHandleScrollToEnd } from '@/lib/helpers/useHandleScrollToEnd';

export const BaseSelect = ({
  options,
  onChange,
  onSearchChange,
  displayValue,
  multiple,
  defaultText,
  showInput = true,
  showSearch,
  searchPlaceholder = 'Search',
  isNested,
  fetchNextPage,
  ignoreSearch,
  showClearButton,
  ...textFieldProps
}: BaseSelectProps) => {
  const [value, setValue] = useState<NestedOptionType[]>(() =>
    getPreselectedOptions(options, textFieldProps.value),
  );

  const initialOptionsLength = useRef(options.length);
  const isOptionsUpdated = useRef(false);

  useEffect(() => {
    if (
      options.length > initialOptionsLength.current &&
      !isOptionsUpdated.current
    ) {
      setValue(getPreselectedOptions(options, textFieldProps.value));
      isOptionsUpdated.current = true;
    }
  }, [options, textFieldProps.value]);

  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSearchTerm('');
  };

  const handleOptionSelect = (selectedOption?: NestedOptionType) => {
    const { stateValue, eventValue } = createNewValue({
      selectedOption,
      value,
      multiple,
      isNested,
    });

    setValue(stateValue);

    onChange?.({
      target: {
        value: eventValue,
      },
    });

    if (!multiple) {
      handleClose();
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement)) return;

    setSearchTerm(e.target.value);

    onSearchChange?.(e as ChangeEvent<HTMLInputElement>);
  };

  const handleScrollToEnd = useHandleScrollToEnd(fetchNextPage);

  return (
    <FormControl
      sx={{
        width: '100%',
        '.MuiTextField-root .MuiInputBase-root': {
          minWidth: 'unset',
        },
      }}>
      {showInput ? (
        <InputField
          {...textFieldProps}
          onClick={handleClick}
          value={computeDisplayValue({ value, displayValue, defaultText })}
          required={false}
          slotProps={{
            input: {
              readOnly: true,
              endAdornment: textFieldProps.disabled ? null : (
                <InputAdornment position="end" sx={{ right: 12 }}>
                  <ArrowIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            '*': {
              cursor: 'pointer',
            },
            ...textFieldProps.sx,
          }}
        />
      ) : (
        <IconButton onClick={handleClick} size="small">
          <MoreIcon width={20} height={20} />
        </IconButton>
      )}

      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            style: {
              minWidth: showInput ? anchorEl?.clientWidth : 200,
              borderRadius: 1,
              boxShadow: 'none',
              border: '1px solid var(--slate-200)',
              padding: '10px',
            },
          },
        }}>
        {showSearch && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              mb: 2,
            }}>
            <InputField
              placeholder={searchPlaceholder}
              value={searchTerm}
              fullWidth
              onChange={handleSearch}
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
            {showClearButton ? (
              <IconButton onClick={() => handleOptionSelect()} size="small">
                <CrossIcon width={14} height={14} />
              </IconButton>
            ) : null}
          </Box>
        )}

        <Box
          onScroll={handleScrollToEnd}
          sx={{
            maxHeight: '50vh',
            overflowY: 'auto',
          }}>
          {options.map((option) => (
            <OptionItem
              key={option.key}
              option={option}
              selectedOptions={value}
              searchTerm={searchTerm}
              onOptionSelect={handleOptionSelect}
              ignoreSearch={ignoreSearch}
            />
          ))}
        </Box>
      </Popover>
    </FormControl>
  );
};
