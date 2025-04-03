import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { useStatisticDates } from '@/lib/helpers/useStatisticDates';
import { useInfinitePaginatedQuery } from '@/lib/helpers/useInfinitePaginatedQuery';

export const useGetSalesQuantityByVenue = (getStatistic?: boolean) => {
  const { salesService } = useSwaggerConfig();

  const { region, product, productItem } = useGlobalFilters();

  const { dateFrom, dateTo } = useStatisticDates(getStatistic);

  return useInfinitePaginatedQuery({
    queryKey: [
      QueryKeys.useGetSalesQuantityByVenue,
      dateFrom,
      dateTo,
      region,
      product,
      productItem,
    ],
    queryFn: ({ pageParam }) =>
      salesService.getSalesQuantityByVenueApiV1SaleSalesQuantityByVenueGet({
        dateFrom,
        dateTo,
        geographyIdIn: region?.join(','),
        productProductCategoryIdIn: product?.join(','),
        productIdIn: product?.join(','),
        page: !getStatistic ? Number(pageParam) : undefined,
        size: getStatistic ? 1000 : undefined,
      }),
  });
};
