import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api/swaggerConfig';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useAuthLogout = () => {
  const { authService } = useSwaggerConfig();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.useAuthLogout],
    mutationFn: async () => authService.authJwtLogoutApiAuthLogoutPost(),
    onSuccess: () =>
      queryClient.removeQueries({
        queryKey: [QueryKeys.useGetAccountData],
      }),
  });
};
