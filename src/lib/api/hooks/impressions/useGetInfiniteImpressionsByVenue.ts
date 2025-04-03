import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { DateRangeEnum } from '@/lib/generated/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useInfinitePaginatedQuery } from '@/lib/helpers/useInfinitePaginatedQuery';

export const useGetInfiniteImpressionsByVenue = () => {
  const { impressionsService } = useSwaggerConfig();

  const { region, dateFrom, dateTo } = useGlobalFilters();

  return useInfinitePaginatedQuery({
    queryKey: [QueryKeys.useGetImpressionsByVenue, dateFrom, dateTo, region],
    queryFn: ({ pageParam }) =>
      impressionsService.getImpressionsByVenuePerRangeApiV1ImpressionImpressionsByVenuePerRangeGet(
        {
          dateFrom,
          dateTo,
          timeFrame: DateRangeEnum.Year,
          geographyIdIn: region?.join(','),
          page: Number(pageParam),
        },
      ),
  });
};
