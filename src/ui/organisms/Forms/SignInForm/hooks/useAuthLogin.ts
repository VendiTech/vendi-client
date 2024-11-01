import { useSwaggerConfig } from '@/lib/api/swaggerConfig';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useMutation } from '@tanstack/react-query';
import { UserLoginSchema } from '../types';

export const useAuthLogin = () => {
  const { authService } = useSwaggerConfig();

  return useMutation({
    mutationKey: [QueryKeys.useAuthLogin],
    mutationFn: async (params: UserLoginSchema) =>
      authService.authJwtLoginApiAuthLoginPost({ userLoginSchema: params }),
  });
};
