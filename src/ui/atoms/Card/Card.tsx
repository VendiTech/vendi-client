import { PropsWithChildren } from 'react';
import { Paper, SxProps, Theme } from '@mui/material';

type Props = {
  sx?: SxProps<Theme>;
  padding?: 'small' | 'large';
} & PropsWithChildren;

export const Card = (props: Props) => {
  const { children, sx, padding = 'small' } = props;

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        boxShadow: 'var(--dropshadow)',
        border: '1px solid var(--slate-200)',
        borderRadius: '10px',
        p: padding === 'large' ? '24px' : '24px 16px',
        minHeight: '100%',
        ...sx,
      }}>
      {children}
    </Paper>
  );
};
