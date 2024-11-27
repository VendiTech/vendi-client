import { useMutation } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { ExportTypeEnum } from '@/lib/generated/api';

const downloadFile = (data: string, fileName: string, contentType: string) => {
  const blob = new Blob([data], { type: contentType });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

export const useExportSales = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region } = useGlobalFilters();

  return useMutation({
    mutationKey: [QueryKeys.useExportSales, dateFrom, dateTo, region],
    mutationFn: async (exportType: ExportTypeEnum) =>
      salesService.postExportSalesApiV1SaleExportPost(
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
