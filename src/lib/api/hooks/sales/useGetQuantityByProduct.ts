import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetQuantityByProduct = (filterByProduct?: boolean) => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, machine, product, productItem } = useGlobalFilters();

  return useQuery({
    queryKey: [
      QueryKeys.useGetQuantityByProduct,
      dateFrom,
      dateTo,
      region,
      machine,
      filterByProduct ? product : undefined,
      filterByProduct ? productItem : undefined,
    ],
    queryFn: () =>
      salesService.getQuantityByProductApiV1SaleQuantityByProductsGet({
        dateFrom,
        dateTo,
        geographyIdIn: region?.join(','),
        machineIdIn: machine?.join(','),
        productProductCategoryIdIn: filterByProduct
          ? product?.join(',')
          : undefined,
        productIdIn: filterByProduct ? productItem?.join(',') : undefined,
      }),
  });
};
