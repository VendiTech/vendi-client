import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { DATE_FORMAT, DISPLAY_DATE_FORMAT } from '@/lib/constants/date';
import DateToIcon from '@/assets/icons/Calendar.svg';
import { DatePicker } from '@/ui/atoms/DatePicker';
import { useGlobalFilters } from '../helpers/use-global-filters';
import { useHandleDateChange } from '../helpers/use-handle-date-change';

export const DateToFilter = () => {
  const { dateFrom, dateTo } = useGlobalFilters();
  const handleDateChange = useHandleDateChange();

  return (
    <Box>
      <DatePicker
        format={DISPLAY_DATE_FORMAT}
        minDate={dayjs(dateFrom)}
        maxDate={dayjs()}
        value={dateTo ? dayjs(dateTo, DATE_FORMAT) : null}
        placeholder={'Date to'}
        icon={DateToIcon}
        onChange={(date) =>
          handleDateChange(dateFrom ? dayjs(dateFrom, DATE_FORMAT) : null, date)
        }
      />
    </Box>
  );
};
