import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useSwaggerConfig } from '@/lib/api';

export const useGetImpressionsSchedule = () => {
  const { impressionsService } = useSwaggerConfig();

  return useQuery({
    queryKey: [QueryKeys.useGetImpressionsSchedule],
    queryFn: () => impressionsService.getExistingSchedulesApiV1ImpressionScheduleViewGet(),
  });
};
