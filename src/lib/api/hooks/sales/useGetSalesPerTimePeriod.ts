import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetSalesPerTimePeriod = () => {
  const { salesService } = useSwaggerConfig();

  const { dateFrom, dateTo, region, machine, product, productItem } = useGlobalFilters();

  return useQuery({
    queryKey: [
      QueryKeys.useGetSalesPerTimePeriod,
      dateFrom,
      dateTo,
      region,
      machine,
      product,
      productItem,
    ],
    queryFn: () =>
      salesService.getSalesRevenuePerTimePeriodApiV1SaleSalesRevenuePerTimePeriodGet(
        {
          dateFrom,
          dateTo,
          geographyIdIn: region?.join(','),
          machineIdIn: machine?.join(','),
          productProductCategoryIdIn: product?.join(','),
          productIdIn: productItem?.join(','),
        },
      ),
  });
};
