import { Stack, StackProps } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

type Props = StackProps & {
  isLoading: boolean;
};

export const LoadingContent: FC<PropsWithChildren<Props>> = ({
  children,
  isLoading,
  sx,
  ...rest
}) => {
  return (
    <Stack
      sx={{
        opacity: '1',
        transition: 'opacity 0.2s',
        ...(isLoading && { opacity: '0.6', pointerEvents: 'none' }),
        ...sx,
      }}
      {...rest}>
      {children}
    </Stack>
  );
};
