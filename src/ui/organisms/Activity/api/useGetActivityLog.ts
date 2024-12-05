import dayjs from 'dayjs';
import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { DATE_FORMAT } from '@/lib/constants/date';

export const useGetActivityLog = (filterByDate?: boolean) => {
  const { activityService } = useSwaggerConfig();

  const { dateFrom, dateTo, user } = useGlobalFilters();

  const dayjsDateTo = dayjs(dateTo, DATE_FORMAT);

  const isToday = !dateTo || dayjsDateTo.isSame(dayjs(), 'day');

  return useQuery({
    queryKey: [
      QueryKeys.useGetActivityLog,
      filterByDate,
      filterByDate ? dateFrom : undefined,
      filterByDate ? dateTo : undefined,
      user,
      isToday,
    ],
    queryFn: () =>
      activityService.partialApiV1ActivityLogGet({
        userIdIn: user?.join(','),
        dateFrom: filterByDate ? dateFrom : undefined,
        dateTo: filterByDate ? dateTo : undefined,
      }),
    refetchInterval: !filterByDate || (isToday && filterByDate) ? 1000 * 60 : 0,
  });
};
