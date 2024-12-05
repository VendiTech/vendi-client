import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetAvgSales = (filterByProduct?: boolean) => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, product } = useGlobalFilters();

  return useQuery({
    queryKey: [
      QueryKeys.useGetAvgSales,
      dateFrom,
      dateTo,
      region,
      filterByProduct ? product : undefined,
    ],
    queryFn: () =>
      salesService.getAverageSalesAcrossMachinesApiV1SaleAverageSalesGet({
        dateFrom,
        dateTo,
        geographyIdIn: region?.join(','),
        productProductCategoryIdIn: filterByProduct ? product?.join(',') : undefined,
      }),
  });
};
