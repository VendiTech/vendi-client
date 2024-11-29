import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { getTimeFrame } from '@/lib/helpers/get-time-frame';

export const useGetImpressionsPerRange = () => {
  const { impressionsService } = useSwaggerConfig();

  const { dateFrom, dateTo } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetImpressionsPerRange, dateFrom, dateTo],
    queryFn: () =>
      impressionsService.getImpressionsPerRangeApiV1ImpressionImpressionsPerRangeGet(
        {
          timeFrame: getTimeFrame(dateFrom, dateTo),
          dateFrom,
          dateTo,
        },
      ),
  });
};
