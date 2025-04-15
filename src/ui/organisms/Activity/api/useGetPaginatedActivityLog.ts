import dayjs from 'dayjs';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { DATE_FORMAT } from '@/lib/constants/date';
import { usePaginatedQuery } from '@/lib/helpers/usePaginatedQuery';

export const useGetPaginatedActivityLog = () => {
  const { activityService } = useSwaggerConfig();

  const { dateFrom, dateTo, user } = useGlobalFilters();

  const dayjsDateTo = dayjs(dateTo, DATE_FORMAT);

  const isToday = !dateTo || dayjsDateTo.isSame(dayjs(), 'day');

  return usePaginatedQuery({
    queryKey: [
      QueryKeys.useGetActivityLog,
      dateFrom,
      dateTo,
      user,
      isToday,
    ],
    queryFn: (page: number) =>
      activityService.partialApiV1ActivityLogGet({
        userIdIn: user?.join(','),
        dateFrom,
        dateTo,
        page,
        orderBy: '-created_at',
      }),
    refetchInterval: isToday ? 1000 * 60 : 0,
  });
};
