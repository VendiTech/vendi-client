import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetAvgImpressions = () => {
  const { impressionsService } = useSwaggerConfig();

  // TODO add region filter
  const { dateFrom, dateTo, region } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetAvgImpressions, dateFrom, dateTo, region],
    queryFn: () =>
      impressionsService.getAverageImpressionsApiV1ImpressionAverageImpressionsGet(
        {
          geographyIdIn: region?.join(','),
          dateFrom,
          dateTo,
        },
      ),
  });
};
