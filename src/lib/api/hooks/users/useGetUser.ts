import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetUser = (userId: number) => {
  const { userService } = useSwaggerConfig();

  return useQuery({
    queryKey: [QueryKeys.useGetUsers, userId],
    queryFn: () =>
      userService.partialApiV1UserObjIdGet({objId: userId}),
  });
};
