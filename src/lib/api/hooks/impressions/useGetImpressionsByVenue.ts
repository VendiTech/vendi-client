import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { DateRangeEnum } from '@/lib/generated/api';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetImpressionsByVenue = (
  timeFrame: DateRangeEnum = DateRangeEnum.Year,
) => {
  const { impressionsService } = useSwaggerConfig();

  const { dateFrom, dateTo, region } = useGlobalFilters();

  return useQuery({
    queryKey: [
      QueryKeys.useGetImpressionsByVenue,
      timeFrame,
      dateFrom,
      dateTo,
      region,
    ],
    queryFn: () =>
      impressionsService.getImpressionsByVenuePerRangeApiV1ImpressionImpressionsByVenuePerRangeGet(
        {
          dateFrom,
          dateTo,
          timeFrame,
          geographyIdIn: region?.join(','),
        },
      ),
  });
};
