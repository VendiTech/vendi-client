import { PropsWithChildren } from 'react';
import { Box, Typography } from '@mui/material';

type Props = {
  title: string;
  subtitle: string;
} & PropsWithChildren;

export const BannerChartWrapper = (props: Props) => {
  const { title, subtitle, children } = props;

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
        <Typography variant={'sm-medium'}>{title}</Typography>

        <Typography variant={'2xl-medium'}>{subtitle}</Typography>
      </Box>

      <Box sx={{height: '100%'}}>
        {children}
      </Box>
    </Box>
  );
};
