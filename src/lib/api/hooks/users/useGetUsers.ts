import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { getOrderBy } from '@/lib/helpers/get-order-by';

type Params = {
  filterByGeography?: boolean;
  orderBy: string | null;
  orderDirection: string | null;
};

export const useGetUsers = (params?: Params) => {
  const filterByGeography = params?.filterByGeography;
  const orderBy = params?.orderBy;
  const orderDirection = params?.orderDirection;

  const orderByFilter = getOrderBy({ orderBy, orderDirection });
  
  const { userService } = useSwaggerConfig();

  const { region, machine } = useGlobalFilters();

  return useQuery({
    queryKey: [
      QueryKeys.useGetUsers,
      filterByGeography ? region : undefined,
      filterByGeography ? machine : undefined,
      orderByFilter,
    ],
    queryFn: () =>
      userService.partialApiV1UserGet({
        orderBy: orderByFilter,
        // geographyIdIn: filterByGeography ? region?.join(',') : undefined,
        // machineIdIn: filterByGeography ? region?.join(',') : undefined,
      }),
  });
};
