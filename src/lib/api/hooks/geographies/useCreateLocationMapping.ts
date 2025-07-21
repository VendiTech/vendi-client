import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';


export const useCreateLocationMapping = () => {
  const { geographiesService } = useSwaggerConfig();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.useCreateLocationMapping],
    mutationFn: (params: { geographyId: number; mapLocation: string }) =>
      geographiesService.partialApiV1GeographyObjIdPatch({
        objId: params.geographyId,
        geographyUpdateSchema: {
          map_location: params.mapLocation,
        },
      }),
    onSuccess: () => {
      toast.success('Location attached successfully');

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetGeographies],
      });
    },
  });
};
