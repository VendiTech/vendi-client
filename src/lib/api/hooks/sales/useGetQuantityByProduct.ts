import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetQuantityByProduct = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetQuantityByProduct, dateFrom, dateTo, region],
    queryFn: () =>
      salesService.getQuantityByProductApiV1SaleQuantityByProductsGet({
        dateFrom,
        dateTo,
        geographyIdIn: region?.join(','),
      }),
  });
};
