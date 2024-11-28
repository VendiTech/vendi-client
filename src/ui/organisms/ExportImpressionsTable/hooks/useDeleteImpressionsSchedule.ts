import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useDeleteImpressionsSchedule = () => {
  const { impressionsService } = useSwaggerConfig();

  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: [QueryKeys.useDeleteImpressionsSchedule],
    mutationFn: async (scheduleId: string) =>
      impressionsService.deleteExistingScheduleApiV1ImpressionScheduleScheduleIdDelete({
        scheduleId,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetImpressionsSchedule],
      }),
  });
};
