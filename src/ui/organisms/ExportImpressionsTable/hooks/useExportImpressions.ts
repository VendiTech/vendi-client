import { useMutation } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { ExportTypeEnum } from '@/lib/generated/api';
import { downloadFile } from '@/lib/helpers/downloadFile';
import { getOrderBy } from '@/lib/helpers/get-order-by';

type Params = {
  orderBy: string | null;
  orderDirection: string | null;
};

export const useExportImpressions = ({ orderBy, orderDirection }: Params) => {
  const { impressionsService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, machine } = useGlobalFilters();

  const orderByFilter = getOrderBy({ orderBy, orderDirection });

  return useMutation({
    mutationKey: [
      QueryKeys.useExportImpressions,
      dateFrom,
      dateTo,
      region,
      machine,
      orderByFilter,
    ],
    mutationFn: async (exportType: ExportTypeEnum) =>
      impressionsService.postExportImpressionsApiV1ImpressionExportPost(
        {
          exportType,
          dateFrom,
          dateTo,
          geographyIdIn: region?.join(','),
          machineMachineIdIn: machine?.join(','),
          orderBy: orderByFilter,
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
