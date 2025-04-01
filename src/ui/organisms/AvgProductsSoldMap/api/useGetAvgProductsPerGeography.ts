import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetAvgProductsPerGeography = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, product, productItem } = useGlobalFilters();

  return useQuery({
    queryKey: [
      QueryKeys.useGetAvgProductsPerGeography,
      dateFrom,
      dateTo,
      product,
      productItem,
    ],
    queryFn: () =>
      salesService.getAverageProductsCountPerGeographyApiV1SaleAverageProductsPerGeographyGet(
        {
          dateFrom,
          dateTo,
          productProductCategoryIdIn: product?.join(','),
          productIdIn: productItem?.join(','),
        },
      ),
  });
};
