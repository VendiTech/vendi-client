import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const useGetUsers = (filterByGeography?: boolean) => {
  const { userService } = useSwaggerConfig();

  const { region, machine } = useGlobalFilters();

  return useQuery({
    queryKey: [
      QueryKeys.useGetUsers,
      filterByGeography ? region : undefined, 
      filterByGeography ? machine : undefined, 
    ],
    queryFn: () => userService.partialApiV1UserGet({
      // geographyIdIn: filterByGeography ? region?.join(',') : undefined,
      // machineIdIn: filterByGeography ? region?.join(',') : undefined,
    }),
  });
};
