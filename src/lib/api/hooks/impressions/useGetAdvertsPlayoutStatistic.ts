import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetAdvertsPlayoutStatistic = () => {
  const { impressionsService } = useSwaggerConfig();

  const { dateFrom, dateTo, region } = useGlobalFilters();

  return useQuery({
    queryKey: [
      QueryKeys.useGetAdvertsPlayoutStatistic,
      dateFrom,
      dateTo,
      region,
    ],
    queryFn: () =>
      impressionsService.getAdvertPlayoutsStatisticApiV1ImpressionAdvertPlayoutsGet(
        {
          dateFrom,
          dateTo,
          geographyIdIn: region?.join(','),
        },
      ),
  });
};
