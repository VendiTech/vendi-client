import { Pagination } from '@mui/material';
import { PaginationProps } from '../types';

export const DataTablePagination = ({
  page,
  total,
  fetchNext,
  pageSize = 100,
}: PaginationProps) => {
  return page && total && total > pageSize ? (
    <Pagination
      size={'medium'}
      page={page}
      count={Math.ceil(total / pageSize)}
      onChange={(_, page) => fetchNext?.(page)}
      sx={{
        '.MuiPaginationItem-root:hover:not(.MuiPaginationItem-ellipsis), .MuiPaginationItem-root:focus-visible:not(.MuiPaginationItem-ellipsis), .MuiPaginationItem-root.Mui-selected':
          {
            background: 'var(--sky-500)',
            color: 'var(--slate-000)',
          },
      }}
    />
  ) : null;
};
