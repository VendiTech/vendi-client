import { QueryKeys } from '@/lib/constants/queryKeys';
import { useSwaggerConfig } from '@/lib/api';
import { useInfinitePaginatedQuery } from '@/lib/helpers/useInfinitePaginatedQuery';

export const useGetPaginatedMachines = (searchTerm?: string) => {
  const { machinesService } = useSwaggerConfig();

  return useInfinitePaginatedQuery({
    queryKey: [QueryKeys.useGetMachines, searchTerm],
    queryFn: ({ pageParam }) =>
      machinesService.partialApiV1MachineGet({
        name: searchTerm,
        size: 20,
        page: Number(pageParam),
      }),
  });
};
