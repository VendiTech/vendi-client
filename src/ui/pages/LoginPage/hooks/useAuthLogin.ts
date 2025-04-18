import { useSwaggerConfig } from '@/lib/api/swaggerConfig';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { UserLoginSchema } from '@/ui/organisms/Forms/SignInForm';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export const useAuthLogin = () => {
  const { authService } = useSwaggerConfig();

  return useMutation({
    mutationKey: [QueryKeys.useAuthLogin],
    mutationFn: async (params: UserLoginSchema) =>
      authService.authJwtLoginApiAuthLoginPost({
        userLoginSchema: params,
        tokenInResponse: true,
      }),
    onSuccess: (token) => {
      localStorage.setItem('auth', token.data.access_token);

      Cookies.set(process.env.NEXT_PUBLIC_COOKIE as string, 't', {
        path: '/',
      });
    },
  });
};
