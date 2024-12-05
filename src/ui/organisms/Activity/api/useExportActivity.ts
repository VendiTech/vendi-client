import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { useMutation } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { ExportTypeEnum } from '@/lib/generated/api';
import { downloadFile } from '@/lib/helpers/downloadFile';

export const useExportActivity = () => {
  const { activityService } = useSwaggerConfig();

  const { dateFrom, dateTo, user } = useGlobalFilters();

  return useMutation({
    mutationKey: [QueryKeys.useExportActivity, dateFrom, dateTo, user],
    mutationFn: async (exportType: ExportTypeEnum) =>
      activityService.postExportSalesApiV1ActivityLogExportPost(
        {
          exportType,
          dateFrom,
          dateTo,
          userIdIn: user?.join(','),
        },
        { responseType: 'blob' },
      ),
    onSuccess: (response) => {
      const contentDisposition = response.headers['content-disposition'];
      const fileName = contentDisposition.split('filename=')[1];
      const contentType = response.headers['content-type'];

      // @ts-expect-error response type
      downloadFile(response.data, fileName, contentType);
    },
  });
};
