import { Box, Stack } from '@mui/material';
import { NordicTotalImpressions } from '@/ui/organisms/NordicTotalImpressions';
import { TotalAdvertPlayouts } from '@/ui/organisms/TotalAdvertPlayouts';
import { GlobalFilters } from '@/ui/organisms/GlobalFilters';
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
        <NordicTotalImpressions />

        <TotalAdvertPlayouts />
      </Flexbox>

      <ChartCard title={'Raw data'} subtitle={'You’ve got 510 venues in total'}>
        <DataTable columns={[]} data={[]} />
      </ChartCard>
    </Stack>
  );
};
