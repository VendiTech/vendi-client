import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetImpressionsPerWeek = () => {
  const { impressionsService } = useSwaggerConfig();

  const { dateFrom, dateTo } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetImpressionsPerWeek, dateFrom, dateTo],
    queryFn: () =>
      impressionsService.getImpressionsPerWeekApiV1ImpressionImpressionsPerWeekGet(
        {
          dateFrom,
          dateTo,
        },
      ),
  });
};
