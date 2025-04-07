import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetFrequencyOfSales = () => {
  const { salesService } = useSwaggerConfig();

  const { region, machine } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetFrequencyOfSales, machine],
    queryFn: () =>
      salesService.getFrequencyOfSalesApiV1SaleFrequencyOfSalesGet({
        geographyIdIn: region?.join(','),
        machineIdIn: machine?.join(','),
      }),
  });
};
