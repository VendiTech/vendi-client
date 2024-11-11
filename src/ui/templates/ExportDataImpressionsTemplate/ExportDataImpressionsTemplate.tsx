import { Box, Stack } from '@mui/material';
import { NordicTotalImpressions } from '@/ui/organisms/NordicTotalImpressions';
import { TotalAdvertPlayouts } from '@/ui/organisms/TotalAdvertPlayouts';
import { GlobalFilters } from '@/ui/organisms/GlobalFilters';
import { Flexbox } from '@/ui/atoms/Flexbox';

export const ExportDataImpressionsTemplate = () => {
  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <GlobalFilters showProductFilter showAdvertisingIdFilter />
      </Box>

      <Flexbox>
        <NordicTotalImpressions />

        <TotalAdvertPlayouts />
      </Flexbox>
    </Stack>
  );
};
