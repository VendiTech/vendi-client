import { QueryKeys } from '@/lib/constants/queryKeys';
import { useSwaggerConfig } from '@/lib/api';
import { useInfinitePaginatedQuery } from '@/lib/helpers/useInfinitePaginatedQuery';

export const useGetMachinesByGeography = (searchTerm?: string) => {
  const { machinesService } = useSwaggerConfig();

  return useInfinitePaginatedQuery({
    queryKey: [QueryKeys.useGetMachinesByGeography, searchTerm],
    queryFn: ({ pageParam }) =>
      machinesService.getMachinesByGeographyApiV1MachineMachinesByGeographyGet({
        name: searchTerm,
        geographyName: searchTerm,
        size: 10,
        page: Number(pageParam),
      }),
  });
};
