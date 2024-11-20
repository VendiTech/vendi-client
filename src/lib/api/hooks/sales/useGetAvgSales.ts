import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetAvgSales = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, product } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetAvgSales, dateFrom, dateTo, region, product],
    queryFn: () =>
      salesService.getAverageSalesAcrossMachinesApiV1SaleAverageSalesGet({
        dateFrom,
        dateTo,
        geographyIdIn: region?.join(','),
        productIdIn: product,
      }),
  });
};
