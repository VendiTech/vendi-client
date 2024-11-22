import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetSalesPerTimePeriod = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, product } = useGlobalFilters();

  return useQuery({
    queryKey: [
      QueryKeys.useGetSalesPerTimePeriod,
      dateFrom,
      dateTo,
      region,
      product,
    ],
    queryFn: () =>
      salesService.getSalesPerTimePeriodApiV1SaleSalesPerTimePeriodGet({
        dateFrom,
        dateTo,
        geographyIdIn: region?.join(','),
        productIdIn: region?.join(','),
      }),
  });
};
