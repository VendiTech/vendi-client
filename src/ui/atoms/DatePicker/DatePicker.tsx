import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type Props = {
  placeholder?: string;
};

export const DatePicker = (props: Props) => {
  const { placeholder } = props;

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
      />
    </LocalizationProvider>
  );
};
