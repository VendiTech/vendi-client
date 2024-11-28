import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { ExportTypeEnum, ScheduleEnum } from '@/lib/generated/api';

type MutationFnArgs = {
  exportType: ExportTypeEnum;
  schedule: ScheduleEnum;
};

export const useScheduleImpressionsExport = () => {
  const { impressionsService } = useSwaggerConfig();

  const queryClient = useQueryClient();

  const { region } = useGlobalFilters();

  return useMutation({
    mutationKey: [QueryKeys.useScheduleImpressionsExport, region],
    mutationFn: async (args: MutationFnArgs) =>
      impressionsService.postScheduleImpressionsApiV1ImpressionSchedulePost({
        ...args,
        geographyIdIn: region?.join(','),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.useGetImpressionsSchedule],
      }),
  });
};
