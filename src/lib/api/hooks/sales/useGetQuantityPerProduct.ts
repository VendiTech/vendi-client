import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetQuantityPerProduct = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetQuantityPerProduct, dateFrom, dateTo, region],
    queryFn: () =>
      salesService.getQuantityPerProductApiV1SaleQuantityPerProductGet({
        dateFrom,
        dateTo,
        geographyIdIn: region?.join(','),
      }),
  });
};
