import { QueryKeys } from '@/lib/constants/queryKeys';
import { useMutation } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api/swaggerConfig';
import { ForgotPasswordSchema } from '@/ui/organisms/Forms/ForgotPasswordForm';

export const useAuthForgotPassword = () => {
  const { passwordService } = useSwaggerConfig();

  return useMutation({
    mutationKey: [QueryKeys.useAuthForgotPassword],
    mutationFn: async (params: ForgotPasswordSchema) =>
      passwordService.resetForgotPasswordApiAuthForgotPasswordPost({
        bodyResetForgotPasswordApiAuthForgotPasswordPost: params,
      }),
  });
};
