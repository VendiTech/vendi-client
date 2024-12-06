import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/lib/constants/date';

export const useStatisticDates = (getStatistic?: boolean) => {
  const { dateFrom, dateTo } = useGlobalFilters();

  const dayjsDateFrom = dayjs(dateFrom, DATE_FORMAT);
  const dayjsDateTo = dayjs(dateTo, DATE_FORMAT);

  const startDate = getStatistic
    ? dayjsDateFrom
        .subtract(1 + dayjsDateTo.diff(dayjsDateFrom, 'day'), 'days')
        .format(DATE_FORMAT)
    : dateFrom;
  const endDate = getStatistic
    ? dayjsDateFrom.subtract(1, 'days').format(DATE_FORMAT)
    : dateTo;

  return {
    dateFrom: startDate,
    dateTo: endDate,
  };
};
