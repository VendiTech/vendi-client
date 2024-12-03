import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { getTimeFrame } from '@/lib/helpers/get-time-frame';

export const useGetAdvertsPlayout = () => {
  const { impressionsService } = useSwaggerConfig();

  // TODO add region filter
  const { dateFrom, dateTo } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetAdvertsPlayout, dateFrom, dateTo],
    queryFn: () =>
      impressionsService.getAdvertPlayoutsPerRangeApiV1ImpressionAdvertPlayoutsPerRangeGet(
        {
          timeFrame: getTimeFrame(dateFrom, dateTo),
          dateFrom,
          dateTo,
        },
      ),
  });
};
