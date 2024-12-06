import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { DateRangeEnum } from '@/lib/generated/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/lib/constants/date';

export const useGetImpressionsByVenue = (
  timeFrame: DateRangeEnum = DateRangeEnum.Year,
  getStatistic?: boolean,
) => {
  const { impressionsService } = useSwaggerConfig();

  const { dateFrom, dateTo, region } = useGlobalFilters();

  const dayjsDateFrom = dayjs(dateFrom, DATE_FORMAT);
  const dayjsDateTo = dayjs(dateTo, DATE_FORMAT);

  const startDate = getStatistic
    ? dayjsDateFrom
        .subtract(1 + dayjsDateTo.diff(dayjsDateFrom, 'day'), 'days')
        .format(DATE_FORMAT)
    : dateFrom;
  const endDate = getStatistic
    ? dayjsDateFrom.subtract(1, 'days').format(DATE_FORMAT)
    : dateTo;

  return useQuery({
    queryKey: [
      QueryKeys.useGetImpressionsByVenue,
      timeFrame,
      startDate,
      endDate,
      region,
    ],
    queryFn: () =>
      impressionsService.getImpressionsByVenuePerRangeApiV1ImpressionImpressionsByVenuePerRangeGet(
        {
          dateFrom: startDate,
          dateTo: endDate,
          timeFrame,
          geographyIdIn: region?.join(','),
        },
      ),
  });
};
