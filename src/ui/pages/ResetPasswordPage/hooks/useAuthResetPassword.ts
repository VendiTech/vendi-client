import { useSwaggerConfig } from '@/lib/api/swaggerConfig';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { ResetPasswordSchema } from '@/ui/organisms/Forms/ResetPasswordForm';
import { useMutation } from '@tanstack/react-query';

export const useAuthResetPassword = () => {
  const { passwordService } = useSwaggerConfig();

  return useMutation({
    mutationKey: [QueryKeys.useAuthResetPassword],
    mutationFn: async (params: ResetPasswordSchema) =>
      passwordService.resetResetPasswordApiAuthResetPasswordPost({
        bodyResetResetPasswordApiAuthResetPasswordPost: params,
      }),
  });
};
