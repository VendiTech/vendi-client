import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { usePaginatedQuery } from '@/lib/helpers/usePaginatedQuery';

export const useGetProductsQuantityByVenue = (filterByProduct = true) => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, product, productItem } = useGlobalFilters();

  return usePaginatedQuery({
    queryKey: [
      QueryKeys.useGetProductsQuantityByVenue,
      dateFrom,
      dateTo,
      region,
      filterByProduct ? product : undefined,
      filterByProduct ? productItem : undefined,
    ],
    queryFn: (page: number) =>
      salesService.getProductsQuantityByVenueApiV1SaleProductsQuantityByVenueGet(
        {
          dateFrom,
          dateTo,
          geographyIdIn: region?.join(','),
          productProductCategoryIdIn: filterByProduct
            ? product?.join(',')
            : undefined,
          productIdIn: filterByProduct ? productItem?.join(',') : undefined,
          page,
        },
      ),
  });
};
