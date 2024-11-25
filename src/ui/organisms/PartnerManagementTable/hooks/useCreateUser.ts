import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api/swaggerConfig';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { CreateLoginSchema } from './useLoginSchema';

export const useCreateUser = () => {
  const { userAdminService } = useSwaggerConfig();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.useUpdateUser],
    mutationFn: async (params: CreateLoginSchema) =>
      userAdminService.postCreateUserApiV1UserAdminCreatePost({
        userAdminCreateSchema: params,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetUsers],
      }),
  });
};
