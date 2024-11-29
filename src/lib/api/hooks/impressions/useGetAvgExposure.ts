import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetAvgExposure = () => {
  const { impressionsService } = useSwaggerConfig();

  const { dateFrom, dateTo } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetAvgExposure, dateFrom, dateTo],
    queryFn: () =>
      impressionsService.getAverageExposureApiV1ImpressionAverageExposureGet({
        dateFrom,
        dateTo,
      }),
  });
};
