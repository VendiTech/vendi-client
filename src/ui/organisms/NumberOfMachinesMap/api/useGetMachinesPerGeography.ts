import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';

export const useGetMachinesPerGeography = () => {
  const { machinesService } = useSwaggerConfig();

  return useQuery({
    queryKey: [QueryKeys.useGetMachinesPerGeography],
    queryFn: () =>
      machinesService.getMachinesCountPerGeographyApiV1MachineCountPerGeographyGet(),
  });
};