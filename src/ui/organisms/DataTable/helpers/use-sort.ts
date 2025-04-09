import { useCallback, useState } from 'react';
import { Sort } from '../types';

export const useSort = (initialValues?: {
  initialField: string;
  initialDirection: string;
}) => {
  const [orderBy, setOrderBy] = useState<string | null>(
    initialValues?.initialField ?? '',
  );
  const [orderDirection, setOrderDirection] = useState<string | null>(
    initialValues?.initialDirection ?? 'asc',
  );

  const getOnSort = useCallback(
    (fieldName?: string) => (sort: Sort) => {
      setOrderBy(fieldName || sort.field);
      setOrderDirection(sort.direction);
    },
    [],
  );

  return { orderBy, orderDirection, getOnSort };
};
