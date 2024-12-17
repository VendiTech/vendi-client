import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { DateRangeEnum } from '@/lib/generated/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useStatisticDates } from '@/lib/helpers/useStatisticDates';

export const useGetImpressionsByVenue = (
  timeFrame: DateRangeEnum = DateRangeEnum.Year,
  getStatistic?: boolean,
) => {
  const { impressionsService } = useSwaggerConfig();

  const { region } = useGlobalFilters();
  const { dateFrom, dateTo } = useStatisticDates(getStatistic);

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
          size: 1000,
        },
      ),
  });
};
