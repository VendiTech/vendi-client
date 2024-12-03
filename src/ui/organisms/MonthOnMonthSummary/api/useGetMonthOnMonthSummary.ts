import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { DATE_FORMAT } from '@/lib/constants/date';
import { DateRangeEnum } from '@/lib/generated/api';

export const useGetMonthOnMonthSummary = () => {
  const { impressionsService } = useSwaggerConfig();

  const { dateFrom, dateTo } = useGlobalFilters();

  const dayjsDateFrom = dayjs(dateFrom, DATE_FORMAT);

  const newDateFrom = dayjsDateFrom.isSame(dateTo, 'month')
    ? dayjsDateFrom.subtract(1, 'month').format(DATE_FORMAT)
    : dateFrom;

  return useQuery({
    queryKey: [QueryKeys.useGetMonthOnMonthSummary, dateFrom, dateTo],
    queryFn: () =>
      impressionsService.getMonthsOnMonthSummaryApiV1ImpressionMonthOnMonthSummaryGet(
        {
          timeFrame: DateRangeEnum.Month,
          dateFrom: newDateFrom,
          dateTo,
        },
      ),
  });
};
