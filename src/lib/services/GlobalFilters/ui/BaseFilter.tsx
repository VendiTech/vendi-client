import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { BaseSelect, BaseSelectProps } from '@/ui/atoms/Select';

type Props = { icon?: ReactNode } & BaseSelectProps;

export const BaseFilter = (props: Props) => {
  const { multiple, onChange, icon, options, value, displayValue, ...rest } =
    props;

  return (
    <Box>
      <BaseSelect
        multiple={multiple}
        onChange={onChange}
        fullWidth
        InputProps={{
          startAdornment: icon ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'var(--slate-400)',
                pl: 1.5,
              }}>
              {icon}
            </Box>
          ) : null,
        }}
        options={options}
        value={value}
        displayValue={displayValue}
        {...rest}
      />
    </Box>
  );
};
