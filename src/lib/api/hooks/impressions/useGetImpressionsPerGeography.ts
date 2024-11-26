import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetImpressionsPerGeography = () => {
  const { impressionsService } = useSwaggerConfig();

  const { dateFrom, dateTo } = useGlobalFilters();
  
  return useQuery({
    queryKey: [QueryKeys.useGetImpressionsPerGeography, dateFrom, dateTo],
    queryFn: () =>
      impressionsService.getImpressionsPerGeographyApiV1ImpressionImpressionsPerGeographyGet(
        {
          dateFrom,
          dateTo,
        },
      ),
  });
};
