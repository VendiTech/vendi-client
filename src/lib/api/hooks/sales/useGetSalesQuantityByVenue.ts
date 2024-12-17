import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { useStatisticDates } from '@/lib/helpers/useStatisticDates';

export const useGetSalesQuantityByVenue = (getStatistic?: boolean) => {
  const { salesService } = useSwaggerConfig();

  const { region, product } = useGlobalFilters();

  const { dateFrom, dateTo } = useStatisticDates(getStatistic);

  return useQuery({
    queryKey: [
      QueryKeys.useGetSalesQuantityByVenue,
      dateFrom,
      dateTo,
      region,
      product,
    ],
    queryFn: () =>
      salesService.getSalesQuantityByVenueApiV1SaleSalesQuantityByVenueGet({
        dateFrom,
        dateTo,
        geographyIdIn: region?.join(','),
        productProductCategoryIdIn: product?.join(','),
        size: 1000,
      }),
  });
};
