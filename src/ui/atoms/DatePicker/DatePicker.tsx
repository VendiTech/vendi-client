/* eslint-disable @typescript-eslint/no-explicit-any */

import { FC, useState } from 'react';
import { DatePicker as MuiDatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider, PickersActionBar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import CalendarIcon from '@/assets/icons/Calendar.svg';
import { InputField } from '@/ui/atoms/InputField';

type Props = {
  placeholder?: string;
  icon?: FC
} & DatePickerProps<Dayjs>;


export const DatePicker = (props: Props) => {
  const { placeholder, value, format, icon, ...rest } = props;

  const [open, setOpen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        value={value}
        format={format}
        slots={{
          openPickerIcon: icon ?? CalendarIcon,
          field: InputField,
        }}
        slotProps={{
          actionBar: {
            actions: ['clear', 'accept'],
          },
          popper: {
            sx: {
              '& .MuiPaper-root': {
                border: '1px solid var(--slate-200)',
                boxShadow: 'none',
              },

              '& .MuiPickersDay-root.Mui-selected': {
                background: 'var(--sky-500) !important',
              },
              
              '& .MuiPickersCalendarHeader-root': {
                justifyContent: 'space-between',
              },
            },
          },
          openPickerIcon: {
            color: 'var(--slate-400)',
            width: 16,
            height: 16,
          },
          field: {
            onClick: () => setOpen(true),
            inputProps: {
              readOnly: true,
            },
            fullWidth: true,
            placeholder,
            value: value?.format(format),
            sx: {
              '& .MuiButtonBase-root:hover': {
                backgroundColor: 'transparent !important',
              },

              '& .MuiTouchRipple-root': {
                display: 'none',
              },
              
              '& input': {
                cursor: 'pointer !important',
              },
              '& .MuiInputBase-root.MuiOutlinedInput-root': {
                minWidth: '175px',
              },

              '& .MuiInputAdornment-root': {
                right: 0,
                pr: '15px',
              },
            },
          } as any,
        }}
        {...rest}
      />
    </LocalizationProvider>
  );
};