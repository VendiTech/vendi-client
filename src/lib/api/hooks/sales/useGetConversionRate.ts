import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetConversionRate = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetConversionRate, dateFrom, dateFrom],
    queryFn: () =>
      salesService.getConversionRateApiV1SaleConversionRateGet({
        dateFrom,
        dateTo,
      }),
  });
};
