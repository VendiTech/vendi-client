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

  const dayjsDateFrom = dayjs(dateFrom, DATE_FORMAT).startOf('month');

  const newDateFrom = dayjsDateFrom.isSame(dateTo, 'month')
    ? dayjsDateFrom.subtract(1, 'month').format(DATE_FORMAT)
    : dayjsDateFrom.format(DATE_FORMAT);

  return useQuery({
    queryKey: [
      QueryKeys.useGetMonthOnMonthSummary,
      dayjsDateFrom.format(DATE_FORMAT),
      dateTo,
    ],
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
