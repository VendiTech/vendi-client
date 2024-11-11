import { useSwaggerConfig } from '@/lib/api/swaggerConfig';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetAccountData = () => {
  const { userService } = useSwaggerConfig();

  return useQuery({
    queryKey: [QueryKeys.useGetAccountData],
    queryFn: () => userService.getShowMeApiV1UserMeGet(),
  });
};
