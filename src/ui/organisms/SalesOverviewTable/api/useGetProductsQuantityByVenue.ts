import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetProductsQuantityByVenue = (filterByProduct = true) => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, product, productItem } = useGlobalFilters();

  return useQuery({
    queryKey: [
      QueryKeys.useGetProductsQuantityByVenue,
      dateFrom,
      dateTo,
      region,
      filterByProduct ? product : undefined,
      filterByProduct ? productItem : undefined,
    ],
    queryFn: () =>
      salesService.getProductsQuantityByVenueApiV1SaleProductsQuantityByVenueGet(
        {
          dateFrom,
          dateTo,
          geographyIdIn: region?.join(','),
          productProductCategoryIdIn: filterByProduct
            ? product?.join(',')
            : undefined,
          productIdIn: filterByProduct ? productItem?.join(',') : undefined,
          size: 1000,
        },
      ),
  });
};
