import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetMonthOnMonthSummary = () => {
  const { impressionsService } = useSwaggerConfig();

  const { dateFrom, dateTo } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetMonthOnMonthSummary, dateFrom, dateTo],
    queryFn: () =>
      impressionsService.getMonthsOnMonthSummaryApiV1ImpressionMonthOnMonthSummaryGet(
        {
          timeFrame: 'month',
          dateFrom,
          dateTo,
        },
      ),
  });
};
