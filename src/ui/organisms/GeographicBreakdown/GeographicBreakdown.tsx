import { Box, Typography } from '@mui/material';
import { Flexbox } from '@/ui/atoms/Flexbox';
import { PercentageOfImpressions } from './charts/PercentageOfImpressions';
import { AvgMonthlyImpressions } from './charts/AvgMonthlyImpressions';
import { PercentageOfSales } from './charts/PercentageOfSales';

export const GeographicBreakdown = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
      <Typography variant={'sm-medium'} color={'var(--slate-900)'}>
        Geographic breakdown
      </Typography>

      <Flexbox>
        <PercentageOfImpressions />

        <AvgMonthlyImpressions />

        <PercentageOfSales />
      </Flexbox>
    </Box>
  );
};
