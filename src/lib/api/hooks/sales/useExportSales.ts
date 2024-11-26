import { useMutation } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { ExportTypeEnum } from '@/lib/generated/api';

const downloadFile = (data: string, exportType: ExportTypeEnum) => {
  const binaryData = Uint8Array.from(
    data.split('').map((char) => char.charCodeAt(0)),
  );

  const blob =
    exportType === ExportTypeEnum.Csv
      ? new Blob([data], { type: 'text/csv;charset=utf-8;' })
      : new Blob([binaryData], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute(
    'download',
    exportType === ExportTypeEnum.Csv ? 'export.csv' : 'export.xlsx',
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const useExportSales = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region } = useGlobalFilters();

  return useMutation({
    mutationKey: [QueryKeys.useExportSales, dateFrom, dateTo, region],
    mutationFn: async (exportType: ExportTypeEnum) =>
      salesService.postExportSalesApiV1SaleExportPost({
        exportType,
        dateFrom,
        dateTo,
        geographyIdIn: region?.join(','),
      }),
    onSuccess: (response, exportType) =>
      downloadFile(String(response.data), exportType),
  });
};
