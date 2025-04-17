import { useSwaggerConfig } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { getOrderBy } from '@/lib/helpers/get-order-by';

type Params = {
  filter?: boolean;
  orderBy: string | null;
  orderDirection: string | null;
};

export const useGetUsers = (params?: Params) => {
  const filter = params?.filter;
  const orderBy = params?.orderBy;
  const orderDirection = params?.orderDirection;

  const orderByFilter = getOrderBy({ orderBy, orderDirection });

  const { userService } = useSwaggerConfig();

  const { region, machine, product, productItem } = useGlobalFilters();

  return useQuery({
    queryKey: [
      QueryKeys.useGetUsers,
      filter ? region : undefined,
      filter ? machine : undefined,
      filter ? product : undefined,
      filter ? productItem : undefined,
      orderByFilter,
    ],
    queryFn: () =>
      userService.partialApiV1UserGet({
        orderBy: orderByFilter,
        geographyIdIn: filter ? region?.join(',') : undefined,
        machineIdIn: filter ? machine?.join(',') : undefined,
        productCategoryIdIn: filter ? product?.join(',') : undefined,
        productIdIn: filter ? productItem?.join(',') : undefined,
      }),
  });
};
