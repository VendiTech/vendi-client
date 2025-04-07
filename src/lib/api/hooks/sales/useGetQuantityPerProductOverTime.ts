import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetQuantityPerProductOverTime = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, machine } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetQuantityPerProductOverTime, dateFrom, dateTo, region, machine],
    queryFn: () =>
      salesService.getQuantityPerCategoryApiV1SaleQuantityPerCategoryGet(
        {
          dateFrom,
          dateTo,
          geographyIdIn: region?.join(','),
          machineIdIn: machine?.join(','),
        },
      ),
  });
};
