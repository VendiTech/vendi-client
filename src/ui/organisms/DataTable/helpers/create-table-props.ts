import { ReactNode } from 'react';
import { Breakpoint } from '@mui/material';
import type { DataTableProps, Sort } from '../types';

type Element<T> = {
  field: keyof T;
  value: string;
  component?: ReactNode;
  hideAt?: Breakpoint;
  onSort?: (sort: Sort) => void;
};

type Arguments<T> = {
  /** All target fields should not be nested */
  data: T[];
  columns: {
    field: keyof T;
    title: string;
    render?: (item: T) => ReactNode;
    sortDisabled?: boolean;
    hidden?: boolean;
    hideAt?: Breakpoint;
    onSort?: (sort: Sort) => void;
  }[];
} & Omit<DataTableProps, 'data' | 'columns'>;

export const createTableProps = <T extends { id: string }>({
  data,
  columns,
  ...args
}: Arguments<T>) => {
  const parsedData = data.map((item: T) => {
    const elements = columns.reduce((acc, column) => {
      if (column.hidden) return acc;

      const value = item[column.field];

      const newElement: Element<T> = {
        field: column.field,
        value:
          typeof value === 'string'
            ? value
            : typeof value === 'number'
              ? String(value)
              : '',
        component: column.render?.(item),
        hideAt: column.hideAt,
        onSort: column.onSort,
      };

      return [...acc, newElement];
    }, [] as Element<T>[]);

    return { id: item.id, elements };
  });

  const filteredColumns = columns.filter((column) => !column.hidden);

  return { data: parsedData, columns: filteredColumns, ...args };
};
