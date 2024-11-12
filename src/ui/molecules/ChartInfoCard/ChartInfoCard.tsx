import { PropsWithChildren } from 'react';
import { Box, Typography } from '@mui/material';
import { Card } from '@/ui/atoms/Card';
import { LoadingText } from '@/ui/atoms/LoadingText';
import { GrowthPercent } from '@/ui/atoms/GrowthPercent';

type Props = {
  title: string;
  value: string;
  growthPercent: number;
  subtitle?: string;
  isLoading?: boolean;
} & PropsWithChildren;

export const ChartInfoCard = (props: Props) => {
  const { title, value, growthPercent, subtitle, isLoading, children } = props;

  return (
    <Card sx={{ flex: '1 1 auto', gap: 2 }} padding={'large'}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Typography variant={'sm-medium'} color={'var(--slate-900)'}>
          {title}
        </Typography>

        {subtitle ? (
          <Typography variant={'sm-medium'} color={'var(--slate-500)'}>
            {subtitle}
          </Typography>
        ) : null}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: '10px',
          }}>
          <LoadingText
            variant={'3xl-medium'}
            color={'var(--slate-900)'}
            isLoading={!!isLoading}>
            {value}
          </LoadingText>

          <GrowthPercent isLoading={isLoading} percent={growthPercent} />
        </Box>

        <Box
          sx={{
            width: 100,
            height: 66,
          }}>
          {children}
        </Box>
      </Box>
    </Card>
  );
};
