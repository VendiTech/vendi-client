import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api/swaggerConfig';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useDeleteUser = () => {
  const { userAdminService } = useSwaggerConfig();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.useDeleteUser],
    mutationFn: async (userId: number) =>
      userAdminService.deleteUserApiV1UserAdminObjIdDelete({ userId }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetUsers],
      }),
  });
};
