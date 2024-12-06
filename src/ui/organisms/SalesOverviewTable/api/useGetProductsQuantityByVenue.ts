import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetProductsQuantityByVenue = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, product } = useGlobalFilters();

  return useQuery({
    queryKey: [
      QueryKeys.useGetProductsQuantityByVenue,
      dateFrom,
      dateTo,
      region,
      product,
    ],
    queryFn: () =>
      salesService.getProductsQuantityByVenueApiV1SaleProductsQuantityByVenueGet(
        {
          dateFrom,
          dateTo,
          geographyIdIn: region?.join(','),
          productProductCategoryIdIn: product?.join(','),
        },
      ),
  });
};
