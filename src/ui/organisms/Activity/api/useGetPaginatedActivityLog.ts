import dayjs from 'dayjs';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { DATE_FORMAT } from '@/lib/constants/date';
import { usePaginatedQuery } from '@/lib/helpers/usePaginatedQuery';
import { getOrderBy } from '@/lib/helpers/get-order-by';

type Params = {
  orderBy: string | null;
  orderDirection: string | null;
};

export const useGetPaginatedActivityLog = ({
  orderDirection,
  orderBy,
}: Params) => {
  const { activityService } = useSwaggerConfig();

  const { dateFrom, dateTo, user } = useGlobalFilters();

  const dayjsDateTo = dayjs(dateTo, DATE_FORMAT);

  const isToday = !dateTo || dayjsDateTo.isSame(dayjs(), 'day');

  const orderByFilter = getOrderBy({ orderDirection, orderBy });

  return usePaginatedQuery({
    queryKey: [
      QueryKeys.useGetActivityLog,
      dateFrom,
      dateTo,
      user,
      isToday,
      orderBy,
    ],
    queryFn: (page: number) =>
      activityService.partialApiV1ActivityLogGet({
        userIdIn: user?.join(','),
        dateFrom,
        dateTo,
        page,
        orderBy: orderByFilter,
      }),
    refetchInterval: isToday ? 1000 * 60 : 0,
  });
};
