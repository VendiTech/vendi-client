import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useSwaggerConfig } from '@/lib/api';

export const useGetSalesSchedule = () => {
  const { salesService } = useSwaggerConfig();

  return useQuery({
    queryKey: [QueryKeys.useGetSalesSchedule],
    queryFn: () => salesService.getExistingSchedulesApiV1SaleScheduleViewGet(),
  });
};
