import dayjs from 'dayjs';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { DATE_FORMAT } from '@/lib/constants/date';

export const useStatisticDates = (getStatistic?: boolean) => {
  const { dateFrom, dateTo } = useGlobalFilters();

  const previousMonth = dayjs(dateFrom, DATE_FORMAT).subtract(1, 'month');

  const startDate = getStatistic
    ? previousMonth.startOf('month').format(DATE_FORMAT)
    : dateFrom;

  const endDate = getStatistic
    ? previousMonth.endOf('month').format(DATE_FORMAT)
    : dateTo;

  return {
    dateFrom: startDate,
    dateTo: endDate,
  };
};
