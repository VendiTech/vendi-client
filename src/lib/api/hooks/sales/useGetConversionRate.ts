import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useStatisticDates } from '@/lib/helpers/useStatisticDates';

export const useGetConversionRate = (getStatistic?: boolean) => {
  const { salesService } = useSwaggerConfig();

  const { region } = useGlobalFilters();
  const { dateFrom, dateTo } = useStatisticDates(getStatistic);

  return useQuery({
    queryKey: [QueryKeys.useGetConversionRate, dateFrom, dateFrom, region],
    queryFn: () =>
      salesService.getConversionRateApiV1SaleConversionRateGet({
        dateFrom,
        dateTo,
        geographyIdIn: region?.join(','),
      }),
  });
};
