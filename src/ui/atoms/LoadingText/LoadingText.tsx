import { Typography, TypographyProps } from '@mui/material';

type Props = {
  isLoading: boolean;
  withOpacity?: boolean;
} & TypographyProps;

export const LoadingText = (props: Props) => {
  const { isLoading, sx, children, withOpacity, ...rest } = props;

  return isLoading ? (
    <Typography
      {...rest}
      sx={{
        background: withOpacity ? 'var(--slate-000)' : 'var(--slate-100)',
        opacity: withOpacity ? 0.2 : 1,
        userSelect: 'none',
        color: 'transparent',
        borderRadius: 99,
        width: '3em',
        minHeight: '1em',
        overflow: 'hidden',
        ...sx,
      }}>
      Loading
    </Typography>
  ) : (
    <Typography sx={sx} {...rest}>
      {children}
    </Typography>
  );
};
