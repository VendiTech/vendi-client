import dayjs from 'dayjs';
import { Box } from '@mui/material';
import DateFromIcon from '@/assets/icons/CalendarEmpty.svg';
import { DATE_FORMAT, DISPLAY_DATE_FORMAT } from '@/lib/constants/date';
import { DatePicker } from '@/ui/atoms/DatePicker';
import { useGlobalFilters } from '../helpers/use-global-filters';
import { useHandleDateChange } from '../helpers/use-handle-date-change';

export const DateFromFilter = () => {
  const { dateFrom, dateTo } = useGlobalFilters();
  const handleDateChange = useHandleDateChange();

  return (
    <Box>
      <DatePicker
        format={DISPLAY_DATE_FORMAT}
        maxDate={dayjs(dateTo)}
        value={dateFrom ? dayjs(dateFrom, DATE_FORMAT) : null}
        placeholder={'Date from'}
        icon={DateFromIcon}
        onChange={(date) =>
          handleDateChange(date, dateTo ? dayjs(dateTo, DATE_FORMAT) : null)
        }
      />
    </Box>
  );
};