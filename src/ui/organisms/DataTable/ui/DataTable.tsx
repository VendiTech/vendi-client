import { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { ActionsMenu } from '@/ui/molecules/MenuButton';
import { SortArrow } from '@/ui/atoms/SortArrow';
import { NoData } from '@/ui/atoms/NoData';
import { DataTableCell } from './DataTableCell';
import { DataTableProps, Sort } from '../types';
import { DataTablePagination } from '@/ui/organisms/DataTable/ui/DataTablePagination';

/** props can be created using createTableProps */
export const DataTable = (props: DataTableProps) => {
  const {
    data,
    columns,
    menuActions = [],
    onRowClick,
    actionsHidden,
    canRowBeEdited,
    fetchNext,
    page,
    total,
    pageSize,
    disableMinHeight,
  } = props;

  const [sort, setSort] = useState<Sort>({
    field: null,
    direction: null,
  });

  const handleSort = (field: string, onSort?: (sort: Sort) => void) => {
    setSort({
      field,
      direction: sort.direction === 'asc' ? 'desc' : 'asc',
    });

    if (onSort) {
      onSort(sort);

      return;
    }
  };

  return data.length ? (
    <>
      <TableContainer
        sx={{ overflow: 'auto', height: disableMinHeight ? 'auto' : 416 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((item) => (
                <DataTableCell
                  key={item.title}
                  hideAt={item.hideAt}
                  sx={{
                    color: 'var(--slate-500)',
                  }}>
                  {!item.sortDisabled ? (
                    <TableSortLabel
                      onClick={() => handleSort(item.field, item.onSort)}
                      IconComponent={() => (
                        <SortArrow
                          direction={sort.direction}
                          visible={sort.field === item.field}
                        />
                      )}>
                      {item.title}
                    </TableSortLabel>
                  ) : null}
                </DataTableCell>
              ))}

              <TableCell sx={{ width: 0, p: 0 }} />
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((parentItem) => (
              <TableRow
                hover={!!onRowClick}
                key={parentItem.id}
                onClick={() => onRowClick?.(parentItem.id)}
                sx={{
                  cursor: onRowClick ? 'pointer' : 'default',
                  '&:hover': {
                    backgroundColor: 'var(--slate-050)',
                  },
                  '&:last-child .MuiTableCell-root': {
                    borderBottom: 'none',
                  },
                }}>
                {parentItem.elements.map((item) => (
                  <DataTableCell key={item.field} hideAt={item.hideAt}>
                    {item.component ?? item.value}
                  </DataTableCell>
                ))}

                <TableCell sx={{ p: 0, textAlign: 'right' }}>
                  {actionsHidden && !canRowBeEdited?.(parentItem.id) ? null : (
                    <ActionsMenu
                      actions={menuActions.map((action) => ({
                        ...action,
                        fn: () => action.fn(parentItem.id),
                      }))}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DataTablePagination
        pageSize={pageSize}
        page={page}
        total={total}
        fetchNext={fetchNext}
      />
    </>
  ) : (
    <Box
      sx={{
        height: disableMinHeight ? 'auto' : 416,
        flexGrow: 1,
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
      }}>
      <NoData />
    </Box>
  );
};
