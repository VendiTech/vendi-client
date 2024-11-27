import { useSwaggerConfig } from '@/lib/api/swaggerConfig';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetVerified = (token: string) => {
  const { verifyService } = useSwaggerConfig();

  return useQuery({
    queryKey: [QueryKeys.useGetVerified],
    queryFn: () =>
      verifyService.verifyVerifyApiAuthVerifyPost({
        bodyVerifyVerifyApiAuthVerifyPost: { token },
      }),
  });
};
