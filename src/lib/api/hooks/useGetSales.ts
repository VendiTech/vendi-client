import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { SalesApiPartialApiV1SaleGet0Request } from '@/lib/generated/api';
import { useSwaggerConfig } from '../swaggerConfig';

export const useGetSales = (params?: SalesApiPartialApiV1SaleGet0Request) => {
  const { salesService } = useSwaggerConfig();

  return useQuery({
    queryKey: [QueryKeys.useGetSales, params?.dateFrom, params?.dateTo],
    queryFn: () =>
      salesService.partialApiV1SaleGet({
        dateFrom: params?.dateFrom,
        dateTo: params?.dateTo,
      }),
    // TODO remove retry
    retry: false,
  });
};
