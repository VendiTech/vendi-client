import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetRawImpressions = () => {
  const { impressionsService } = useSwaggerConfig();

  const { dateFrom, dateTo, venue, region } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetRawImpressions, dateFrom, dateTo, venue, region],
    queryFn: () =>
      impressionsService.getImpressionsExportRawDataApiV1ImpressionExportRawDataGet(
        {
          dateFrom,
          dateTo,
          geographyIdIn: region?.join(','),
          machineMachineIdIn: venue?.join(','),
          size: 1000,
        },
      ),
  });
};
