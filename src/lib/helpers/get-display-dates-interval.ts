import dayjs from 'dayjs';
import { DATE_FORMAT, DISPLAY_DATE_FORMAT } from '@/lib/constants/date';

export const getDisplayDatesInterval = (dateFrom: string | null, dateTo: string | null) => {
  if (!dateFrom || !dateTo) return 'this month';
  
  const dayjsDateFrom = dayjs(dateFrom, DATE_FORMAT);
  const dayjsDateTo = dayjs(dateTo, DATE_FORMAT);
 
  const isSameYear = dayjsDateFrom.year() === dayjsDateTo.year();
 
  return  isSameYear
    ? `from ${dayjsDateFrom.format('MM.DD')} to ${dayjsDateTo.format('MM.DD')}`
    : `from ${dayjsDateFrom.format(DISPLAY_DATE_FORMAT)} to ${dayjsDateTo.format(DISPLAY_DATE_FORMAT)}`;
}