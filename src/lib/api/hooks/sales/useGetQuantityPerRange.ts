import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { getTimeFrame } from '@/lib/helpers/get-time-frame';

export const useGetQuantityPerRange = (filterByProduct?: boolean) => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, product } = useGlobalFilters();

  return useQuery({
    queryKey: [
      QueryKeys.useGetQuantityPerRange,
      dateFrom,
      dateTo,
      region,
      filterByProduct ? product : undefined,
    ],
    queryFn: () =>
      salesService.getSalesPerRangeApiV1SaleQuantityPerRangeGet({
        timeFrame: getTimeFrame(dateFrom, dateTo),
        dateFrom,
        dateTo,
        geographyIdIn: region?.join(','),
        productProductCategoryIdIn: filterByProduct ? product?.join(',') : undefined,
      }),
  });
};
