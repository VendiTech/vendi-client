import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetProducts = () => {
  const { productsService } = useSwaggerConfig();

  return useQuery({
    queryKey: [QueryKeys.useGetProducts],
    queryFn: () =>
      productsService.partialApiV1ProductsGet(),
  });
};
