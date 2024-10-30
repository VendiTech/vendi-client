import { PropsWithChildren } from 'react';
import { Box, Typography } from '@mui/material';
import { Card } from '@/ui/atoms/Card';
import { LoadingText } from '@/ui/atoms/LoadingText';

type Props = {
  title: string;
  subtitle?: string;
} & PropsWithChildren;

export const ChartCard = (props: Props) => {
  const { title, subtitle, children } = props;

  return (
    <Card padding={'large'}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant={'lg-medium'} color={'var(--slate-900)'}>
            {title}
          </Typography>

          <LoadingText
            isLoading={!subtitle}
            variant={'sm-regular'}
            color={'var(--slate-500)'}>
            You made $203k in revenue this month.
          </LoadingText>
        </Box>
      </Box>

      {children}
    </Card>
  );
};
