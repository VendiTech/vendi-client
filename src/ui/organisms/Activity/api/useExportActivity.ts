import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { useMutation } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { ExportTypeEnum } from '@/lib/generated/api';
import { downloadFile } from '@/lib/helpers/downloadFile';

export const useExportActivity = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, user } = useGlobalFilters();

  //TODO replace endpoint
  return useMutation({
    mutationKey: [QueryKeys.useExportActivity, dateFrom, dateTo, user],
    mutationFn: async (exportType: ExportTypeEnum) =>
      salesService.postExportSalesApiV1SaleExportPost(
        {
          exportType,
          dateFrom,
          dateTo,
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
