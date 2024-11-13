import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/ui/organisms/GlobalFilters';
import { getTimeFrame } from '@/lib/helpers/get-time-frame';

export const useGetQuantityPerRange = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetQuantityPerRange, dateFrom, dateTo],
    queryFn: () =>
      salesService.getSalesPerRangeApiV1SaleQuantityPerRangeGet({
        timeFrame: getTimeFrame(dateFrom, dateTo),
        dateFrom,
        dateTo,
      }),
  });
};