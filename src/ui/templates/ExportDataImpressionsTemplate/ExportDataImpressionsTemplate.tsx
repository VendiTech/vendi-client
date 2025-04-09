import { Box, Stack } from '@mui/material';
import { GlobalFilters } from '@/lib/services/GlobalFilters';
import { BrandTotalImpressions } from '@/ui/organisms/BrandTotalImpressions';
import { TotalAdvertPlayouts } from '@/ui/organisms/TotalAdvertPlayouts';
import { ExportImpressionsTable } from '@/ui/organisms/ExportImpressionsTable';
import { Flexbox } from '@/ui/atoms/Flexbox';

export const ExportDataImpressionsTemplate = () => {
  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <GlobalFilters showClearButton />
      </Box>

      <Flexbox>
        <BrandTotalImpressions />

        <TotalAdvertPlayouts />
      </Flexbox>

      <ExportImpressionsTable />
    </Stack>
  );
};
