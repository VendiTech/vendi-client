import { PropsWithChildren } from 'react';
import { SxProps, Theme, Typography } from '@mui/material';

type Props = {
  variant?: 'good' | 'bad' | 'neutral';
  sx?: SxProps<Theme>
} & PropsWithChildren;

const goodSx: SxProps<Theme> = {
  color: 'var(--green-500)',
  backgroundColor: 'var(--green-050)',
};

const badSx: SxProps<Theme> = {
  color: 'var(--red-500)',
  backgroundColor: 'var(--red-050)',
};

const neutralSx: SxProps<Theme> = {
  color: 'var(--sky-500)',
  backgroundColor: 'var(--sky-050)',
};

export const Chip = (props: Props) => {
  const { children, sx, variant = 'neutral' } = props;

  const variantSx =
    variant === 'good' ? goodSx : variant === 'bad' ? badSx : neutralSx;

  return (
    <Typography
      variant={'xs-medium'}
      sx={{
        px: '8px',
        py: '2px',
        lineHeight: '18px',
        borderRadius: 10,
        ...variantSx,
        ...sx,
      }}>
      {children}
    </Typography>
  );
};
