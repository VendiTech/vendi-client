import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api/swaggerConfig';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useResetPassword = () => {
  const { userAdminService } = useSwaggerConfig();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.useResetPassword],
    mutationFn: async (userId: number) =>
      userAdminService.postResetPasswordApiV1UserAdminResetPasswordUserIdPost({
        userId,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetActivityLog],
      }),
  });
};
