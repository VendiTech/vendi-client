import { useCallback, useEffect, useMemo, useState } from 'react';
import { AxiosResponse } from 'axios';
import {
  keepPreviousData,
  UndefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';

type Response<T = unknown[]> = AxiosResponse<{
  items: T;
  page: number | null;
  pages?: number | null;
  total?: number | null;
}>;

export const useInfinitePaginatedQuery = <T extends Response>(
  options: Omit<
    UndefinedInitialDataInfiniteOptions<T>,
    'initialPageParam' | 'getNextPageParam'
  >,
) => {
  const { data, fetchNextPage, ...rest } = useInfiniteQuery({
    ...options,
    initialPageParam: 1,
    getNextPageParam: (_, __, lastPageParam) => Number(lastPageParam) + 1,
    placeholderData: (previousData) => {
      if (previousData?.pageParams.length === 1 && !previousData?.pageParams[1])
        return;

      return keepPreviousData(previousData);
    },
  });

  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    if (!data || isLastPage) return;

    const lastPage = data.pages[data.pages.length - 1];

    setIsLastPage((lastPage.data.pages ?? 0) <= (lastPage.data.page ?? 0));
  }, [data, isLastPage]);

  const flatItems = useMemo(
    () => data?.pages.map((page) => page.data.items.flat()).flat() ?? [],
    [data],
  ) as T['data']['items'];

  const fetchNext = useCallback(() => {
    if (isLastPage) return;

    return fetchNextPage();
  }, [fetchNextPage, isLastPage]);

  const total = data?.pages[0].data.total;

  return {
    data: flatItems,
    fetchNextPage: fetchNext,
    total,
    ...rest,
  };
};
