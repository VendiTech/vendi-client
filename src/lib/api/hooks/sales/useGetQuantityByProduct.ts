import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/ui/organisms/GlobalFilters';

export const useGetQuantityByProduct = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetQuantityByProduct, dateFrom, dateTo],
    queryFn: () =>
      salesService.getQuantityByProductApiV1SaleQuantityByProductsGet({
        dateFrom,
        dateTo,
      }),
  });
};
