import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { SalesApiPartialApiV1SaleGet0Request } from '@/lib/generated/api';
import { useQuery } from '@tanstack/react-query';

export const useGetSales = (params?: SalesApiPartialApiV1SaleGet0Request) => {
  const { salesService } = useSwaggerConfig();

  return useQuery({
    queryKey: [QueryKeys.useGetSales, params?.dateFrom, params?.dateTo],
    queryFn: () =>
      salesService.partialApiV1SaleGet({
        dateFrom: params?.dateFrom,
        dateTo: params?.dateTo,
      }),
    retry: false,
  });
};
