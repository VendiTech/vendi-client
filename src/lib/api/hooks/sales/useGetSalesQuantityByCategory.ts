import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { usePaginatedQuery } from '@/lib/helpers/usePaginatedQuery';
import { getOrderBy } from '@/lib/helpers/get-order-by';

type Params = {
  filterByProduct: boolean;
  orderBy: string | null;
  orderDirection: string | null;
};

export const useGetSalesQuantityByCategory = ({
  orderBy,
  orderDirection,
  filterByProduct = false,
}: Params) => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, machine, product } = useGlobalFilters();

  const orderByFilter = getOrderBy({ orderBy, orderDirection });

  return usePaginatedQuery({
    queryKey: [
      QueryKeys.useGetSalesQuantityByCategory,
      dateFrom,
      dateTo,
      region,
      machine,
      filterByProduct ? product : undefined,
      orderByFilter,
    ],
    queryFn: (page: number) =>
      salesService.getSalesQuantityByCategoryApiV1SaleSalesQuantityByCategoryGet(
        {
          dateFrom,
          dateTo,
          geographyIdIn: region?.join(','),
          machineIdIn: machine?.join(','),
          productProductCategoryIdIn: product?.join(','),
          page,
          orderBy: orderByFilter,
        },
      ),
  });
};
