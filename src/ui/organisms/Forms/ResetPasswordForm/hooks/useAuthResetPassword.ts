import { useSwaggerConfig } from '@/lib/api/swaggerConfig';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useMutation } from '@tanstack/react-query';
import { ResetPasswordSchema } from '../types';

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
