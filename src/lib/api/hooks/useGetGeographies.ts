import { useSwaggerConfig } from '../swaggerConfig';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetGeographies = () => {
  const { geographiesService } = useSwaggerConfig();
  
  return useQuery({
    queryKey: [QueryKeys.useGetGeographies],
    queryFn: () => geographiesService.partialApiV1GeographyGet(),
    // TODO remove retry
    retry: false,
  })
};
