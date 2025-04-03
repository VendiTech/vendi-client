import { QueryKeys } from '@/lib/constants/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/api/axiosConfig';
import { useGetAccountData } from '@/lib/api';
import { UpdateLoginSchema } from './useLoginSchema';

export type UpdateUserSchema = {
  userId: number;
  params: UpdateLoginSchema & { company_logo_image?: File };
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { data: currentUser } = useGetAccountData();

  return useMutation({
    mutationKey: [QueryKeys.useUpdateUser],
    mutationFn: async ({ userId, params }: UpdateUserSchema) => {
      const formData = new FormData();

      Object.entries(params).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
          return;
        }

        if (Array.isArray(value)) {
          formData.append(key, `[${value.join(',')}]`);
          return;
        }

        formData.append(key, String(value));
      });

      // TODO workaround because can't send arrays as string wrapped in [] using generated api
      return axiosInstance
        .getAxiosInstance()
        .patch(
          `${process.env.NEXT_PUBLIC_URL}api/v1/user/admin/edit/${userId}`,
          formData,
        );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetUsers],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetActivityLog],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetUsersCompanyLogos],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetUserCompanyLogo, variables.userId],
      });
      if (currentUser?.data.id === variables.userId) {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.useGetCompanyLogo],
        });
      }
    },
  });
};
