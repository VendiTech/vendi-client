import {
  DatePicker as MuiDatePicker,
  DatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import { CalendarIcon, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { InputField } from '@/ui/atoms/InputField';
import { useState } from 'react';

type Props = {
  placeholder?: string;
} & DatePickerProps<Dayjs>;

export const DatePicker = (props: Props) => {
  const { placeholder, ...rest } = props;

  const [open, setOpen] = useState(false);
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        slots={{
          textField: InputField,
        }}
        slotProps={{
          popper: {
            sx: {
              '& .MuiPaper-root': {
                border: '1px solid var(--slate-200)',
                boxShadow: 'none',
              },

              '& .MuiPickersDay-root.Mui-selected': {
                background: 'var(--sky-500)',
              },
            },
          },
          textField: {
            value: props.value,
            onClick: () => setOpen(true),
            placeholder,
            sx: {
              userSelect: 'none',
            },
            slotProps: {
              
            },
            InputProps: {
              endAdornment: <CalendarIcon width={16} height={16} />
            },
          },
        }}
        {...rest}
      />
    </LocalizationProvider>
  );
};
