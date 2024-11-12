import { DatePicker as MuiDatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

type Props = {
  placeholder?: string;
} & DatePickerProps<Dayjs>;

export const DatePicker = (props: Props) => {
  const { placeholder, ...rest } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        slotProps={{
          textField: {
            placeholder,
            variant: 'outlined',
            size: 'small',
          },
        }}
        {...rest}
      />
    </LocalizationProvider>
  );
};
