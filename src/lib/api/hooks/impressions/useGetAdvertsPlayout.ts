import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { getTimeFrame } from '@/lib/helpers/get-time-frame';

export const useGetAdvertsPlayout = () => {
  const { impressionsService } = useSwaggerConfig();

  const { dateFrom, dateTo, region } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetAdvertsPlayout, dateFrom, dateTo, region],
    queryFn: () =>
      impressionsService.getAdvertPlayoutsPerRangeApiV1ImpressionAdvertPlayoutsPerRangeGet(
        {
          geographyIdIn: region?.join(','),
          timeFrame: getTimeFrame(dateFrom, dateTo),
          dateFrom,
          dateTo,
        },
      ),
  });
};
