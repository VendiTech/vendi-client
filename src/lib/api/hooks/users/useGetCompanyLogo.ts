import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetCompanyLogo = () => {
  const { userService } = useSwaggerConfig();

  return useQuery({
    queryKey: [QueryKeys.useGetCompanyLogo],
    queryFn: () =>
      userService.companyLogoImageApiV1UserCompanyLogoImageGet(),
  });
};
