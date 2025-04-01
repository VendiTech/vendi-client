import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetAvgSales = (filterByProduct?: boolean) => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, product, productItem } = useGlobalFilters();

  return useQuery({
    queryKey: [
      QueryKeys.useGetAvgSales,
      dateFrom,
      dateTo,
      region,
      filterByProduct ? product : undefined,
      filterByProduct ? productItem : undefined,
    ],
    queryFn: () =>
      salesService.getAverageSalesAcrossMachinesApiV1SaleAverageSalesGet({
        dateFrom,
        dateTo,
        geographyIdIn: region?.join(','),
        productProductCategoryIdIn: filterByProduct
          ? product?.join(',')
          : undefined,
        productIdIn: filterByProduct ? productItem?.join(',') : undefined,
      }),
  });
};
