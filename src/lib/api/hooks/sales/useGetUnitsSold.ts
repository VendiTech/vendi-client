import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetUnitsSold = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetUnitsSold, dateFrom, dateTo],
    queryFn: () =>
      salesService.getUnitsSoldApiV1SaleUnitsSoldGet({
        dateFrom,
        dateTo,
      }),
  });
};
