import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { usePaginatedQuery } from '@/lib/helpers/usePaginatedQuery';
import { getOrderBy } from '@/lib/helpers/get-order-by';

type Params = {
  filterByProduct: boolean;
  orderBy: string | null;
  orderDirection: string | null;
};

export const useGetProductsQuantityByVenue = ({
  filterByProduct = true,
  orderDirection,
  orderBy,
}: Params) => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, product, productItem } = useGlobalFilters();

  const orderByFilter = getOrderBy({ orderBy, orderDirection });

  return usePaginatedQuery({
    queryKey: [
      QueryKeys.useGetProductsQuantityByVenue,
      dateFrom,
      dateTo,
      region,
      filterByProduct ? product : undefined,
      filterByProduct ? productItem : undefined,
      orderByFilter,
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
          orderBy: orderByFilter,
          size: 50,
        },
      ),
  });
};
