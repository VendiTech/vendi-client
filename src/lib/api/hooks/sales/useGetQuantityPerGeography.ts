import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetQuantityPerGeography = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetQuantityPerGeography, dateFrom, dateTo],
    queryFn: () =>
      salesService.getQuantityPerGeographyApiV1SaleQuantityPerGeographyGet({
        dateFrom,
        dateTo,
      }),
  });
};
