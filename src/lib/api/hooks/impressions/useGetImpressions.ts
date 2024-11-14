import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetImpressions = () => {
  const { impressionsService } = useSwaggerConfig();

  const { dateFrom, dateTo } = useGlobalFilters();

  return useQuery({
    queryKey: [QueryKeys.useGetImpressions, dateFrom, dateTo],
    queryFn: () =>
      impressionsService.partialApiV1ImpressionGet({
        size: 365,
        dateFrom,
        dateTo,
      }),
  });
};
