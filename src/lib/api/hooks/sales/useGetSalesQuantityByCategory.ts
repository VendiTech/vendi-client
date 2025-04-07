import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { usePaginatedQuery } from '@/lib/helpers/usePaginatedQuery';

export const useGetSalesQuantityByCategory = (filterByProduct = false) => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, machine, product } = useGlobalFilters();

  return usePaginatedQuery({
    queryKey: [
      QueryKeys.useGetSalesQuantityByCategory,
      dateFrom,
      dateTo,
      region,
      machine,
      filterByProduct ? product : undefined,
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
        },
      ),
  });
};
