'use client';

import {
  Box,
  FormControl,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { forwardRef, PropsWithChildren, useState } from 'react';
import { InputField } from '../InputField/InputField';
import Check from '@/assets/icons/Check.svg';
import MoreIcon from '@/assets/icons/More.svg';
import { OptionType, Props } from './types';

export const BaseSelect = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  (props, ref) => {
    const {
      children,
      multiple = false,
      options,
      defaultText,
      showInput = true,
      ...rest
    } = props;

    const [value, setValue] = useState<OptionType[]>([]);

    const customChange = (event: SelectChangeEvent<unknown>) => {
      rest.onChange?.(event);
      setValue(event.target.value as OptionType[]);
    };

    return (
      <FormControl
        sx={{
          width: '100%',
          minWidth: 'unset',
          position: 'relative',
          overflow: showInput ? 'visible' : 'hidden',
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
                  const isArray = Array.isArray(value);

                  if (isArray && value.length === 0) {
                    return defaultText;
                  }
                  
                  if (isArray && value.length > 3) {
                    return value.slice(0, 3).join(', ') + ', ...'
                  }
                  
                  if (isArray && value.length > 1) {
                    return value.join(', ');
                  }
                  
                  return value as string;
                },
                MenuProps: {
                  PaperProps: {
                    sx: {
                      borderRadius: '8px',
                      boxShadow: 'none',
                      border: '1px solid var(--slate-200)',
                      padding: '10px',
                      '& .MuiList-root.MuiMenu-list': {
                        padding: 0,
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
                    },
                  },
                },
              },
            }}
            {...rest}>
            {options.map((option) => {
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
                    <Check
                      style={{
                        width: '16px',
                        height: '16px',
                      }}
                    />
                    <Typography variant="sm-regular">{option.value}</Typography>
                  </Box>
                </MenuItem>
              );
            })}
            {children}
          </InputField>
        </Box>
      </FormControl>
    );
  },
);

BaseSelect.displayName = 'BaseSelect';
