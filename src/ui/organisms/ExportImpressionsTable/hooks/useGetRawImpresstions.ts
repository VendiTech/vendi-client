import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { usePaginatedQuery } from '@/lib/helpers/usePaginatedQuery';

export const useGetRawImpressions = () => {
  const { impressionsService } = useSwaggerConfig();

  const { dateFrom, dateTo, machine, region } = useGlobalFilters();

  return usePaginatedQuery({
    queryKey: [QueryKeys.useGetRawImpressions, dateFrom, dateTo, machine, region],
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
