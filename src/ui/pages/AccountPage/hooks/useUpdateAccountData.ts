import { useSwaggerConfig } from '@/lib/api/swaggerConfig';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { UpdateAccountSchema } from '@/ui/organisms/Forms/AccountForms';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateAccountData = () => {
  const { userService } = useSwaggerConfig();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.useUpdateAccountData],
    mutationFn: async (params: UpdateAccountSchema) =>
      userService.updateUserApiV1UserEditPatch({ userUpdate: params }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetAccountData],
      });
    },
  });
};
