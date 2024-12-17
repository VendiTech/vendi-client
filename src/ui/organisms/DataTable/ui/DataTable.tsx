import { useMemo, useState } from 'react';
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
import { sortItems } from '../helpers/sort-items';
import { DataTableCell } from './DataTableCell';
import { Comparator, DataTableProps, Sort } from '../types';

/** props can be created using createTableProps */
export const DataTable = (props: DataTableProps) => {
  const {
    data,
    columns,
    searchTerm,
    fieldsForSearch = [],
    menuActions = [],
    onRowClick,
    actionsHidden,
    canRowBeEdited,
  } = props;

  const [sort, setSort] = useState<Sort>({
    field: null,
    direction: null,
  });

  const handleSort = (field: string, comparator?: Comparator) => {
    setSort({
      field,
      direction: sort.direction === 'asc' ? 'desc' : 'asc',
      comparator,
    });
  };

  const sortedItems = useMemo(
    () => sortItems({ data, fieldsForSearch, searchTerm, sort }),
    [data, fieldsForSearch, searchTerm, sort],
  );

  return sortedItems.length ? (
    <TableContainer sx={{ overflow: 'auto', maxHeight: 416 }}>
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
                    onClick={() => handleSort(item.field, item.comparator)}
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
          {sortedItems.map((parentItem) => (
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
  ) : (
    <Box
      sx={{
        flexGrow: 1,
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
      }}>
      <NoData />
    </Box>
  );
};
