import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetAvgProductsPerGeography = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, product } = useGlobalFilters();

  return useQuery({
    queryKey: [
      QueryKeys.useGetAvgProductsPerGeography,
      dateFrom,
      dateTo,
      product,
    ],
    queryFn: () =>
      salesService.getAverageProductsCountPerGeographyApiV1SaleAverageProductsPerGeographyGet(
        {
          dateFrom,
          dateTo,
          productIdIn: product?.join(','),
        },
      ),
  });
};
