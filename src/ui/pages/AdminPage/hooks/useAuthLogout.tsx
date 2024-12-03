import { useSwaggerConfig } from '@/lib/api/swaggerConfig';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useMutation } from '@tanstack/react-query';

export const useAuthLogout = () => {
  const { authService } = useSwaggerConfig();

  return useMutation({
    mutationKey: [QueryKeys.useAuthLogout],
    mutationFn: async () => authService.authJwtLogoutApiAuthLogoutPost(),
  });
};
