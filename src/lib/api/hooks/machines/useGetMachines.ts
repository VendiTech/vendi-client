import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/lib/constants/queryKeys';
import { useSwaggerConfig } from '@/lib/api';

export const useGetPaginatedMachines = (searchTerm?: string) => {
  const { machinesService } = useSwaggerConfig();

  return useInfiniteQuery({
    queryKey: [QueryKeys.useGetMachines, searchTerm],
    queryFn: ({ pageParam }) =>
      machinesService.partialApiV1MachineGet({
        name: searchTerm,
        size: 20,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPageParam + 1;
    },
    placeholderData: (previousData) => {
      if (
        previousData?.pageParams.length === 1 &&
        !previousData?.pageParams[1]
      ) {
        return undefined;
      } else {
        return keepPreviousData(previousData);
      }
    },
  });
};
