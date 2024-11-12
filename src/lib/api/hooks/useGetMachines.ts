import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useSwaggerConfig } from '../swaggerConfig';

export const useGetMachines = () => {
  const { machinesService } = useSwaggerConfig();

  return useQuery({
    queryKey: [QueryKeys.useGetMachines],
    queryFn: () => machinesService.partialApiV1MachineGet(),
  });
};