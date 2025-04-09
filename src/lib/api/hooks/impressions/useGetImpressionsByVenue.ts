import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { DateRangeEnum } from '@/lib/generated/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useStatisticDates } from '@/lib/helpers/useStatisticDates';
import { usePaginatedQuery } from '@/lib/helpers/usePaginatedQuery';

export const useGetImpressionsByVenue = (
  orderBy: string | null,
  timeFrame: DateRangeEnum = DateRangeEnum.Year,
  getStatistic?: boolean,
) => {
  const { impressionsService } = useSwaggerConfig();

  const { region } = useGlobalFilters();
  const { dateFrom, dateTo } = useStatisticDates(getStatistic);

  return usePaginatedQuery({
    queryKey: [
      QueryKeys.useGetImpressionsByVenue,
      timeFrame,
      dateFrom,
      dateTo,
      region,
      // TODO orderBy,
      // orderBy,
    ],
    queryFn: (page: number) =>
      impressionsService.getImpressionsByVenuePerRangeApiV1ImpressionImpressionsByVenuePerRangeGet(
        {
          dateFrom,
          dateTo,
          timeFrame,
          geographyIdIn: region?.join(','),
          page,
          // orderBy,
        },
      ),
  });
};
