import { PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import { LoadingText } from '@/ui/atoms/LoadingText';

type Props = {
  title: string;
  subtitle: string;
  isLoading: boolean;
} & PropsWithChildren;

export const BannerChartWrapper = (props: Props) => {
  const { title, subtitle, isLoading, children } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 3,
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '10px',
        }}>
        <LoadingText isLoading={isLoading} variant={'sm-medium'}>
          {title}
        </LoadingText>

        <LoadingText isLoading={isLoading} variant={'2xl-medium'}>
          {subtitle}
        </LoadingText>
      </Box>

      <Box sx={{ height: '100%' }}>{children}</Box>
    </Box>
  );
};
