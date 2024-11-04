import { ReactNode } from 'react';
import { Breakpoint } from '@mui/material';
import { MenuAction } from '@/ui/molecules/MenuButton';

export type Comparator = (prev: string, curr: string) => number;

export type Sort = {
  field: string | null;
  direction: 'asc' | 'desc' | null;
  comparator?: Comparator;
};

export type CellData = {
  id: string;
  elements: {
    field: string;
    value?: string;
    component?: ReactNode;
    hideAt?: Breakpoint;
  }[];
};

export type DataTableProps = {
  columns: {
    title: string;
    field: string;
    sortDisabled?: boolean;
    comparator?: Comparator;
    hideAt?: Breakpoint;
  }[];
  data: CellData[];
  fieldsForSearch?: string[];
  menuActions?: (Omit<MenuAction, 'fn'> & { fn: (id: string) => void })[];
  onRowClick?: (id: string) => void;
  searchTerm?: string;
  actionsHidden?: boolean;
  canRowBeEdited?: (rowId: string) => boolean;
};

export type TabsTableProps = {
  tabs: {
    title: string;
    tableProps: DataTableProps;
  }[];
};
