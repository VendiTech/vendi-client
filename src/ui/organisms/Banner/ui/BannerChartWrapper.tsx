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
        gap: 1,
        width: '100%',
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '10px',
          flexShrink: 1,
        }}>
        <LoadingText
          withOpacity
          isLoading={isLoading}
          variant={'sm-medium'}
          sx={{ lineHeight: '21px' }}>
          {title}
        </LoadingText>

        <LoadingText withOpacity isLoading={isLoading} variant={'2xl-medium'}>
          {subtitle}
        </LoadingText>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>{children}</Box>
    </Box>
  );
};
