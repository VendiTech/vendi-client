import { PropsWithChildren } from 'react';
import { SxProps, Theme, Typography } from '@mui/material';

type Props = {
  variant?: 'good' | 'neutral';
} & PropsWithChildren;

const goodSx: SxProps<Theme> = {
  color: 'var(--green-500)',
  backgroundColor: 'var(--green-050)',
};

export const Chip = (props: Props) => {
  const { children, variant = 'neutral' } = props;

  const variantSx = variant === 'good' ? goodSx : goodSx;

  return (
    <Typography
      variant={'xs-medium'}
      sx={{
        px: '8px',
        py: '2px',
        lineHeight: '18px',
        borderRadius: 10,
        ...variantSx,
      }}>
      {children}
    </Typography>
  );
};
