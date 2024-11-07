import {
  Breakpoint,
  SxProps,
  TableCell,
  TableCellProps,
  Theme,
} from '@mui/material';

type Props = TableCellProps & {
  hideAt?: Breakpoint;
};

const getBaseCellStyles = (
  sx?: SxProps<Theme>,
  hideAt?: Breakpoint,
): SxProps<Theme> => ({
  padding: '12px 8px',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '21px',
  color: 'var(--slate-900)',
  display: {
    mobile: 'none',
    [hideAt ?? 'mobile']: 'table-cell',
  },

  ...(sx ?? {}),
});

export const DataTableCell = (props: Props) => {
  const { hideAt, children, sx, ...rest } = props;

  return (
    <TableCell sx={getBaseCellStyles(sx, hideAt)} {...rest}>
      {children}
    </TableCell>
  );
};
