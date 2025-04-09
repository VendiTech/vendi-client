import { useMutation } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { ExportTypeEnum } from '@/lib/generated/api';
import { downloadFile } from '@/lib/helpers/downloadFile';

export const useExportSales = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, machine, product } = useGlobalFilters();

  return useMutation({
    mutationKey: [
      QueryKeys.useExportSales,
      dateFrom,
      dateTo,
      region,
      machine,
      product,
    ],
    mutationFn: async (exportType: ExportTypeEnum) =>
      salesService.postExportSalesApiV1SaleExportPost(
        {
          exportType,
          dateFrom,
          dateTo,
          geographyIdIn: region?.join(','),
          machineIdIn: machine?.join(','),
          productProductCategoryIdIn: product?.join(','),
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
