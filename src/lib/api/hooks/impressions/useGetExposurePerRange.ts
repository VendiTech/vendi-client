import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { getTimeFrame } from '@/lib/helpers/get-time-frame';

export const useGetExposurePerRange = () => {
  const { impressionsService } = useSwaggerConfig();

  const { dateFrom, dateTo, region } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetExposurePerRange, dateFrom, dateTo, region],
    queryFn: () =>
      impressionsService.getExposurePerRangeApiV1ImpressionExposurePerRangeGet({
        timeFrame: getTimeFrame(dateFrom, dateTo),
        dateFrom,
        dateTo,
        geographyIdIn: region?.join(','),
      }),
  });
};
