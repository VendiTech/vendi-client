import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useSwaggerConfig } from '@/lib/api';

export const useGetMachines = (searchTerm?: string) => {
  const { machinesService } = useSwaggerConfig();

  return useQuery({
    queryKey: [QueryKeys.useGetMachines, searchTerm],
    queryFn: () =>
      machinesService.partialApiV1MachineGet({
        name: searchTerm,
        size: 20,
      }),
  });
};
