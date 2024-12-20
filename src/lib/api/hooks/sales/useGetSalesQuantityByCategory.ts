import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetSalesQuantityByCategory = (filterByProduct = false) => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, product } = useGlobalFilters();

  return useQuery({
    queryKey: [
      QueryKeys.useGetSalesQuantityByCategory,
      dateFrom,
      dateTo,
      region,
      filterByProduct ? product : undefined,
    ],
    queryFn: () =>
      salesService.getSalesQuantityByCategoryApiV1SaleSalesQuantityByCategoryGet(
        {
          dateFrom,
          dateTo,
          geographyIdIn: region?.join(','),
          productProductCategoryIdIn: product?.join(','),
          size: 1000,
        },
      ),
  });
};
