import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { DateRangeEnum } from '@/lib/generated/api';
import { useGlobalFilters } from '@/ui/organisms/GlobalFilters';

export const useGetAvgSalesPerRange = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetAvgSalesPerRange, dateFrom, dateTo],
    queryFn: () =>
      salesService.getAverageSalesPerRangeApiV1SaleAverageSalesPerRangeGet({
        timeFrame: DateRangeEnum.Week,
        dateFrom,
        dateTo,
      }),
  });
};
