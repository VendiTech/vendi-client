import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { getTimeFrame } from '@/lib/helpers/get-time-frame';
import { DateRangeEnum } from '@/lib/generated/api';

export const useGetUnitsSold = (timeframe?: DateRangeEnum) => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetUnitsSold, dateFrom, dateTo, timeframe],
    queryFn: () =>
      salesService.getUnitsSoldApiV1SaleUnitsSoldPerRangeGet({
        timeFrame: timeframe ?? getTimeFrame(dateFrom, dateTo),
        dateFrom,
        dateTo,
      }),
  });
};
