import { useQuery } from '@tanstack/react-query';
import { useSwaggerConfig } from '@/lib/api';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetGeographies = () => {
  const { geographiesService } = useSwaggerConfig();
  
  return useQuery({
    queryKey: [QueryKeys.useGetGeographies],
    queryFn: () => geographiesService.partialApiV1GeographyGet()
  })
};
