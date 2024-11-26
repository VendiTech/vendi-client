import { useMutation } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { ExportTypeEnum, ScheduleEnum } from '@/lib/generated/api';

type MutationFnArgs = {
  exportType: ExportTypeEnum;
  schedule: ScheduleEnum;
};

export const useScheduleSalesExport = () => {
  const { salesService } = useSwaggerConfig();

  const { region } = useGlobalFilters();

  return useMutation({
    mutationKey: [QueryKeys.useExportSales, region],
    mutationFn: async (args: MutationFnArgs) =>
      salesService.postScheduleSalesApiV1SaleSchedulePost({
        ...args,
        geographyIdIn: region?.join(','),
      }),
  });
};
