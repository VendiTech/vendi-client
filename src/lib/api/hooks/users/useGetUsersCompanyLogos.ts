import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetUsersCompanyLogos = () => {
  const { userAdminService } = useSwaggerConfig();

  return useQuery({
    queryKey: [QueryKeys.useGetUsersCompanyLogos],
    queryFn: () =>
      userAdminService.getCompanyLogoImagesApiV1UserAdminCompanyLogoImagesGet(),
  });
};
