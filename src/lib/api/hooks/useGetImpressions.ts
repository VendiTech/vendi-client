import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetImpressions = () => {
  const { impressionsService } = useSwaggerConfig();

  return useQuery({
    queryKey: [QueryKeys.useGetImpressions],
    queryFn: () => impressionsService.partialApiV1ImpressionGet(),
    // TODO remove retry
    retry: false,
  });
};
