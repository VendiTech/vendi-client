import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api/swaggerConfig';
import { QueryKeys } from '@/lib/constants/queryKeys';
import Cookies from 'js-cookie';

export const useAuthLogout = () => {
  const { authService } = useSwaggerConfig();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.useAuthLogout],
    mutationFn: async () => authService.authJwtLogoutApiAuthLogoutPost(),
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: [QueryKeys.useGetAccountData],
      });

      Cookies.remove(
        `${process.env.NEXT_PUBLIC_COOKIE as string}_front` as string,
      );
    },
  });
};
