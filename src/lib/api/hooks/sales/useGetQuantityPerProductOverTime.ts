import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetQuantityPerProductOverTime = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetQuantityPerProductOverTime, dateFrom, dateTo, region],
    queryFn: () =>
      salesService.getQuantityPerProductOverTimeApiV1SaleQuantityPerProductOverTimeGet(
        {
          dateFrom,
          dateTo,
          geographyIdIn: region,
        },
      ),
  });
};
