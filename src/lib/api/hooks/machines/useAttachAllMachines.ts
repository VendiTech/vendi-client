import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useAttachAllMachines = () => {
  const { userAdminService } = useSwaggerConfig();

  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: [QueryKeys.useAttachAllMachines],
    mutationFn: (userId: number) =>
      userAdminService.attachAllMachinesApiV1UserAdminAttachAllMachinesUserIdPost(
        {
          userId,
        },
      ),
    onSuccess: () => {
      toast.success('All machines assigned successfully');

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetUsers],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetActivityLog],
      });
    }
  });
};
