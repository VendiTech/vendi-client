import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { getTimeFrame } from '@/lib/helpers/get-time-frame';

export const useGetUnitsSold = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetUnitsSold, dateFrom, dateTo],
    queryFn: () =>
      salesService.getUnitsSoldApiV1SaleUnitsSoldGet({
        timeFrame: getTimeFrame(dateFrom, dateTo),
        dateFrom,
        dateTo,
      }),
  });
};
