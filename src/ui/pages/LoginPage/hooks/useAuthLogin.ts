import { useSwaggerConfig } from '@/lib/api/swaggerConfig';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { UserLoginSchema } from '@/ui/organisms/Forms/SignInForm';
import { useMutation } from '@tanstack/react-query';

export const useAuthLogin = () => {
  const { authService } = useSwaggerConfig();

  return useMutation({
    mutationKey: [QueryKeys.useAuthLogin],
    mutationFn: async (params: UserLoginSchema) =>
      authService.authJwtLoginApiAuthLoginPost({ userLoginSchema: params }),
  });
};
