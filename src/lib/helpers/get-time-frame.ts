import { DateRangeEnum } from '@/lib/generated/api';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/lib/constants/date';

export const getTimeFrame = (
  dateFrom: string | null,
  dateTo: string | null,
): DateRangeEnum => {
  if (!dateFrom || !dateTo) {
    return DateRangeEnum.Week;
  }

  const dayjsDateFrom = dayjs(dateFrom, DATE_FORMAT);
  const dayjsDateTo = dayjs(dateTo, DATE_FORMAT);

  const diffInDays = dayjsDateTo.diff(dayjsDateFrom, 'day');
  const diffInMonths = dayjsDateTo.diff(dayjsDateFrom, 'month');
  const diffInYears = dayjsDateTo.diff(dayjsDateFrom, 'year');

  if (diffInDays < 1) {
    return DateRangeEnum.Hour;
  }
  if (diffInDays < 10) {
    return DateRangeEnum.Day;
  }
  if (diffInMonths < 5) {
    return DateRangeEnum.Week;
  }
  if (diffInYears < 1) {
    return DateRangeEnum.Month;
  }
  if (diffInYears < 5) {
    return DateRangeEnum.Quarter;
  }
  
  return DateRangeEnum.Year;
};
