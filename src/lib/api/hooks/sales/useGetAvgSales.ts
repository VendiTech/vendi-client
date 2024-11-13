import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetAvgSales = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetAvgSales, dateFrom, dateTo, region],
    queryFn: () =>
      salesService.getAverageSalesAcrossMachinesApiV1SaleAverageSalesGet({
        dateFrom,
        dateTo,
        geographyIdIn: region,
      }),
  });
};
