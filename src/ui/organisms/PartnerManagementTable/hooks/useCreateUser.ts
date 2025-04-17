import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api/swaggerConfig';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { CreateLoginSchema } from './useLoginSchema';
import { parsePermissionsToEnum } from '@/lib/helpers/parse-permissions';

export const useCreateUser = () => {
  const { userAdminService } = useSwaggerConfig();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.useUpdateUser],
    mutationFn: async (params: CreateLoginSchema) =>
      userAdminService.postCreateUserApiV1UserAdminCreatePost({
        userAdminCreateSchema: {
          ...params,
          permissions: parsePermissionsToEnum(params.permissions),
        },
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
