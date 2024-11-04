import { Typography, TypographyProps } from '@mui/material';

type Props = {
  isLoading: boolean;
  withOpacity?: boolean;
  hiddenWhileLoading?: boolean;
} & TypographyProps;

export const LoadingText = (props: Props) => {
  const { isLoading, sx, children, withOpacity, hiddenWhileLoading, ...rest } =
    props;

  return isLoading ? (
    <Typography
      {...rest}
      sx={{
        background: withOpacity ? 'var(--slate-000)' : 'var(--slate-100)',
        visibility: hiddenWhileLoading ? 'hidden' : 'visible',
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
