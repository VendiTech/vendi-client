import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetProducts = () => {
  //TODO replace endpoint

  const { salesService } = useSwaggerConfig();

  return useQuery({
    queryKey: [QueryKeys.useGetProducts],
    queryFn: () =>
      salesService.getQuantityPerProductApiV1SaleQuantityPerProductGet(),
  });
};
