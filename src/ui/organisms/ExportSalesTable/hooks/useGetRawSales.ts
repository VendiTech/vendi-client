import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { usePaginatedQuery } from '@/lib/helpers/usePaginatedQuery';

export const useGetRawSales = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, machine, product } = useGlobalFilters();

  return usePaginatedQuery({
    queryKey: [
      QueryKeys.useGetRawSales,
      dateFrom,
      dateTo,
      machine,
      region,
      product,
    ],
    queryFn: (page: number) =>
      salesService.getSalesExportRawDataApiV1SaleExportRawDataGet({
        dateFrom,
        dateTo,
        geographyIdIn: region?.join(','),
        machineIdIn: machine?.join(','),
        productProductCategoryIdIn: product?.join(','),
        page,
      }),
  });
};
