import { Box, Stack } from '@mui/material';
import { GlobalFilters } from '@/lib/services/GlobalFilters';
import { QuantityOfProductsPurchased } from '@/ui/organisms/Purchases';
import { AvgSalesPerMachines } from '@/ui/organisms/AvgSales';
import { ExportSalesTable } from '@/ui/organisms/ExportSalesTable';
import { Flexbox } from '@/ui/atoms/Flexbox';

export const ExportDataSalesTemplate = () => {
  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <GlobalFilters
          showAdvertisingIdFilter
          showProductFilter
          showClearButton
        />
      </Box>

      <Flexbox>
        <QuantityOfProductsPurchased />

        <AvgSalesPerMachines />
      </Flexbox>

      <ExportSalesTable />
    </Stack>
  );
};
