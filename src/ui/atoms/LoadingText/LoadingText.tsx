import { Typography, TypographyProps } from '@mui/material';

type Props = {
  isLoading: boolean;
} & TypographyProps;

export const LoadingText = (props: Props) => {
  const { isLoading, sx, children, ...rest } = props;

  return isLoading ? (
    <Typography
      {...rest}
      sx={{
        background: 'var(--slate-000)',
        opacity: 0.2,
        color: 'transparent',
        borderRadius: 99,
        width: '3em',
        minHeight: '1em',
        overflow: 'hidden',
        ...sx,
      }}
    />
  ) : (
    <Typography sx={sx} {...rest}>
      {children}
    </Typography>
  );
};
