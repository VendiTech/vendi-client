import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetSales = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetSales, dateFrom, dateTo, region],
    queryFn: () =>
      salesService.partialApiV1SaleGet({
        dateFrom,
        dateTo,
        geographyIdIn: region?.join(','),
      }),
  });
};
