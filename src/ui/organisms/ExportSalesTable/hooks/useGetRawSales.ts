import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetRawSales = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, venue, region, product } = useGlobalFilters();

  return useQuery({
    queryKey: [
      QueryKeys.useGetRawSales,
      dateFrom,
      dateTo,
      venue,
      region,
      product,
    ],
    queryFn: () =>
      salesService.getSalesExportRawDataApiV1SaleExportRawDataGet({
        dateFrom,
        dateTo,
        geographyIdIn: region?.join(','),
        machineIdIn: venue?.join(','),
        productProductCategoryIdIn: product?.join(','),
        size: 1000,
      }),
  });
};
