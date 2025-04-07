import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetUnitsSoldStatistic = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, machine } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetUnitsSoldStatistic, dateFrom, dateTo, region, machine],
    queryFn: () =>
      salesService.getUnitsSoldStatisticApiV1SaleUnitsSoldStatisticGet({
        dateFrom,
        dateTo,
        geographyIdIn: region?.join(','),
        machineIdIn: machine?.join(','),
      }),
  });
};
