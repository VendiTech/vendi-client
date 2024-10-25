'use client';

import {
  Box,
  FormControl,
  MenuItem,
  SelectChangeEvent,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { FC, PropsWithChildren, useState } from 'react';
import { InputField } from '../InputField/InputField';
import Check from '@/assets/icons/Check.svg';

type OptionType = {
  key: string | number;
  value: string;
};

type Props = TextFieldProps & {
  onChange?: (event: SelectChangeEvent<unknown>) => void;
  multiple?: boolean;
  options: OptionType[];
};

export const BaseSelect: FC<PropsWithChildren<Props>> = ({
  children,

  multiple = false,
  options,
  ...rest
}) => {
  const [value, setValue] = useState<OptionType[]>([]);

  const customChange = (event: SelectChangeEvent<unknown>) => {
    setValue(event.target.value as OptionType[]);
  };

  return (
    <FormControl sx={{ width: '100%', minWidth: 'unset' }}>
      <InputField
        value={value}
        select
        {...rest}
        slotProps={{
          formHelperText: { component: 'div' },
          select: {
            displayEmpty: true,
            onChange: customChange,
            multiple: multiple,
            renderValue: (selected) => {
              if (Array.isArray(selected) && selected.length > 1) {
                return selected.join(', ');
              } else {
                return selected as string;
              }
            },
            MenuProps: {
              PaperProps: {
                sx: {
                  borderRadius: '8px',
                  padding: '10px',
                  '& .MuiList-root.MuiMenu-list': {
                    padding: 0,
                  },

                  '& .MuiMenuItem-root:not(.Mui-selected) svg': {
                    opacity: 0,
                  },

                  '& .MuiButtonBase-root.MuiMenuItem-root:hover, .MuiButtonBase-root.Mui-focusVisible, .MuiButtonBase-root.Mui-selected ':
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
        }}>
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
    </FormControl>
  );
};
