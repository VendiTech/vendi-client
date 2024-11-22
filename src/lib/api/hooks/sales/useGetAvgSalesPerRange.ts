import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { getTimeFrame } from '@/lib/helpers/get-time-frame';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetAvgSalesPerRange = (filterByProduct?: boolean) => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, product } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetAvgSalesPerRange, dateFrom, dateTo, region, filterByProduct ? product : undefined, ],
    queryFn: () =>
      salesService.getAverageSalesPerRangeApiV1SaleAverageSalesPerRangeGet({
        timeFrame: getTimeFrame(dateFrom, dateTo),
        dateFrom,
        dateTo,
        geographyIdIn: region?.join(','),
        productIdIn: filterByProduct ? product?.join(',') : undefined
      }),
  });
};
