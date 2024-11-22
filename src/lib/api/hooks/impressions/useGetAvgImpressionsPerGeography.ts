import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { getTimeFrame } from '@/lib/helpers/get-time-frame';

export const useGetAvgImpressionsPerGeography = () => {
  const { impressionsService } = useSwaggerConfig();

  const { dateFrom, dateTo } = useGlobalFilters();

  return useQuery({
    queryKey: [
      QueryKeys.useGetAverageImpressionsPerGeography,
      dateFrom,
      dateTo,
    ],
    queryFn: () =>
      impressionsService.getAverageImpressionsPerGeographyApiV1ImpressionAverageImpressionsPerGeographyGet(
        {
          dateFrom,
          dateTo,
          timeFrame: getTimeFrame(dateFrom, dateTo),
        },
      ),
  });
};
