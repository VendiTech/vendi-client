import { Box, Stack } from '@mui/material';
import { GlobalFilters } from '@/lib/services/GlobalFilters';
import { BrandTotalImpressions } from '@/ui/organisms/BrandTotalImpressions';
import { TotalAdvertPlayouts } from '@/ui/organisms/TotalAdvertPlayouts';
import { DataTable } from '@/ui/organisms/DataTable';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { Flexbox } from '@/ui/atoms/Flexbox';

export const ExportDataImpressionsTemplate = () => {
  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <GlobalFilters showAdvertisingIdFilter showClearButton />
      </Box>

      <Flexbox>
        <BrandTotalImpressions />

        <TotalAdvertPlayouts />
      </Flexbox>

      <ChartCard title={'Raw data'} subtitle={'You’ve got 510 venues in total'}>
        <DataTable columns={[]} data={[]} />
      </ChartCard>
    </Stack>
  );
};
