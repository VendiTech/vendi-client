import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useDeleteSalesSchedule = () => {
  const { salesService } = useSwaggerConfig();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.useDeleteSalesSchedule],
    mutationFn: async (scheduleId: string) =>
      salesService.deleteExistingScheduleApiV1SaleScheduleScheduleIdDelete({
        scheduleId,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetSalesSchedule],
      }),
  });
};
