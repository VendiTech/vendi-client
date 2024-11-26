import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetUsers = () => {
  const { userService } = useSwaggerConfig();

  return useQuery({
    queryKey: [QueryKeys.useGetUsers],
    queryFn: () => userService.partialApiV1UserGet(),
  });
};
