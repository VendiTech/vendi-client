import { useSwaggerConfig } from '@/lib/api/swaggerConfig';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateLoginSchema } from './useLoginSchema';

export type UpdateUserSchema = {
  userId: number;
  params: UpdateLoginSchema;
};

export const useUpdateUser = () => {
  const { userAdminService } = useSwaggerConfig();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.useUpdateUser],
    mutationFn: async ({ userId, params }: UpdateUserSchema) =>
      userAdminService.patchEditUserApiV1UserAdminEditUserIdPatch({
        userId,
        userAdminEditSchema: params,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetUsers],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetActivityLog],
      });
    },
  });
};
