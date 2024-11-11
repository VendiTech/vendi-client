import { Box, Stack } from '@mui/material';
import { QuantityOfProductsPurchased } from '@/ui/organisms/QuantityOfProductsPurchased';
import { AvgSalesPerMachines } from '@/ui/organisms/AvgSalesPerMachines';
import { Flexbox } from '@/ui/atoms/Flexbox';
import { GlobalFilters } from '@/ui/organisms/GlobalFilters';

export const ExportDataSalesTemplate = () => {
  return <Stack spacing={2}>
    <Box sx={{ display: 'flex', gap: 2 }}>
      <GlobalFilters showProductFilter />
    </Box>

    <Flexbox>
      <QuantityOfProductsPurchased />
      
      <AvgSalesPerMachines />
    </Flexbox>
  </Stack>
}