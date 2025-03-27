import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetProductsCategories = () => {
  //TODO replace endpoint

  const { salesService } = useSwaggerConfig();

  return useQuery({
    queryKey: [QueryKeys.useGetProductsCategories],
    queryFn: () =>
      salesService.getQuantityPerProductApiV1SaleQuantityPerProductGet({
        dateFrom: '2023-01-01',
      }),
  });
};
