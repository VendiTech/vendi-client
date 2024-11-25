import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetSalesQuantityByVenue = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, product } = useGlobalFilters();

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
        productIdIn: product?.join(','),
      }),
  });
};
