import { useMutation } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { ExportTypeEnum } from '@/lib/generated/api';
import { downloadFile } from '@/lib/helpers/downloadFile';

export const useExportImpressions = () => {
  const { impressionsService } = useSwaggerConfig();

  const { dateFrom, dateTo, region } = useGlobalFilters();

  return useMutation({
    mutationKey: [QueryKeys.useExportImpressions, dateFrom, dateTo, region],
    mutationFn: async (exportType: ExportTypeEnum) =>
      impressionsService.postExportImpressionsApiV1ImpressionExportPost(
        {
          exportType,
          dateFrom,
          dateTo,
          geographyIdIn: region?.join(','),
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
