import { useEffect, useState } from 'react';
import { DefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

type Response = AxiosResponse<{ total: number | null }>;

type QueryOptions<T extends Response> = Omit<
  DefinedInitialDataOptions<T>,
  'queryFn' | 'initialData'
> & {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryFn: (page: number, pageSize?: number) => Promise<T>;
};

type PaginationOptions = {
  pageSize?: number;
  initialPage?: number;
};

export const usePaginatedQuery = <T extends Response>(
  { queryKey, queryFn, placeholderData, ...rest }: QueryOptions<T>,
  paginationOptions?: PaginationOptions,
) => {
  const initialPage = paginationOptions?.initialPage ?? 1;

  const [page, setPage] = useState(initialPage);

  const [previousKey, setPreviousKey] = useState(queryKey);

  useEffect(() => {
    const isKeyChanged = previousKey.reduce(
      (acc, curr, i) =>
        acc || previousKey.length !== queryKey.length || curr !== queryKey[i],
      false,
    );

    if (!isKeyChanged) return;

    setPreviousKey(queryKey);

    setPage(initialPage);
  }, [previousKey, initialPage, queryKey]);

  const queryResult = useQuery({
    ...rest,
    queryKey: [queryKey, page, page],
    queryFn: () => queryFn(page, paginationOptions?.pageSize),
    placeholderData: placeholderData ?? ((previousData) => previousData),
  });

  return {
    ...queryResult,
    page,
    fetchNext: setPage,
    total: queryResult.data?.data.total ?? 0,
    pageSize: paginationOptions?.pageSize,
  };
};
