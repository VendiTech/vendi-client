import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useAttachAllProducts = () => {
  const { userAdminService } = useSwaggerConfig();

  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: [QueryKeys.useAttachAllProducts],
    mutationFn: (userId: number) =>
      userAdminService.attachAllProductsApiV1UserAdminAttachAllProductsUserIdPost(
        {
          userId,
        },
      ),
    onSuccess: (_, userId) => {
      toast.success('All products assigned successfully');

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetUsers, userId],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetUsers],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetActivityLog],
      });
    }
  });
};
