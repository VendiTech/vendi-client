import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useInfinitePaginatedQuery } from '@/lib/helpers/useInfinitePaginatedQuery';

export const useGetInfiniteActivityLog = () => {
  const { activityService } = useSwaggerConfig();

  return useInfinitePaginatedQuery({
    queryKey: [QueryKeys.useGetActivityLog],
    queryFn: ({ pageParam }) =>
      activityService.partialApiV1ActivityLogGet({
        page: Number(pageParam),
      }),
  });
};
