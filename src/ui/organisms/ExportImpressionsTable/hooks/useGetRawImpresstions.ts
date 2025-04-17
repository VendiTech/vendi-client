import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { usePaginatedQuery } from '@/lib/helpers/usePaginatedQuery';
import { getOrderBy } from '@/lib/helpers/get-order-by';

type Params = {
  orderBy?: string | null;
  orderDirection?: string | null;
};

export const useGetRawImpressions = ({ orderBy, orderDirection }: Params) => {
  const { impressionsService } = useSwaggerConfig();

  const { dateFrom, dateTo, machine, region } = useGlobalFilters();

  const orderByFilter = getOrderBy({ orderBy, orderDirection });

  return usePaginatedQuery({
    queryKey: [
      QueryKeys.useGetRawImpressions,
      dateFrom,
      dateTo,
      machine,
      region,
      orderByFilter,
    ],
    // TODO add orderBy
    queryFn: (page: number) =>
      impressionsService.getImpressionsExportRawDataApiV1ImpressionExportRawDataGet(
        {
          dateFrom,
          dateTo,
          geographyIdIn: region?.join(','),
          machineMachineIdIn: machine?.join(','),
          page,
        },
      ),
  });
};
