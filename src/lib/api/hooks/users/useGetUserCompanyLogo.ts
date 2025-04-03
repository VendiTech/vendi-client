import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetUserCompanyLogo = (userId: number) => {
  const { userAdminService } = useSwaggerConfig();

  return useQuery({
    queryKey: [QueryKeys.useGetUserCompanyLogo, userId],
    queryFn: () =>
      userAdminService.getCompanyLogoImageApiV1UserAdminCompanyLogoImageUserIdGet(
        { userId },
      ),
  });
};
