import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetActivityLog = () => {
  const { activityService } = useSwaggerConfig();

  const { dateFrom, dateTo } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetActivityLog, dateFrom, dateTo],
    queryFn: () =>
      activityService.partialApiV1ActivityLogGet({
        dateFrom,
        dateTo,
      }),
  });
};
