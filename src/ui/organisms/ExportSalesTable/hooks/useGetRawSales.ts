import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { usePaginatedQuery } from '@/lib/helpers/usePaginatedQuery';
import { getOrderBy } from '@/lib/helpers/get-order-by';

type Params = {
  orderBy?: string | null;
  orderDirection?: string | null;
};

export const useGetRawSales = ({ orderBy, orderDirection }: Params) => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, machine, product } = useGlobalFilters();

  const orderByFilter = getOrderBy({ orderBy, orderDirection });

  return usePaginatedQuery({
    queryKey: [
      QueryKeys.useGetRawSales,
      dateFrom,
      dateTo,
      machine,
      region,
      product,
      orderByFilter,
    ],
    queryFn: (page: number) =>
      salesService.getSalesExportRawDataApiV1SaleExportRawDataGet({
        dateFrom,
        dateTo,
        geographyIdIn: region?.join(','),
        machineIdIn: machine?.join(','),
        productProductCategoryIdIn: product?.join(','),
        page,
        orderBy: orderByFilter,
      }),
  });
};
