import { Box } from '@mui/material';
import { ProductSplit } from '@/ui/organisms/ProductSplit';
import { FrequencyOfTotalSales } from '@/ui/organisms/FrequencyOfTotalSales';
import { PurchasingHours } from '@/ui/organisms/PurchasingHours';
import { SalesByVenue } from '@/ui/organisms/SalesByVenue';
import { GeographicBreakdown } from '@/ui/organisms/GeographicBreakdown';
import { AdvertisingTable } from '@/ui/organisms/AdvertisingTable';
import { QuantityOfProductsPurchased } from '@/ui/organisms/QuantityOfProductsPurchased';
import { AvgSalesPerMachines } from '@/ui/organisms/AvgSalesPerMachines';

export const SalesTemplate = () => {
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(auto-fit, minmax(512px, 1fr))',
        }}>
        <QuantityOfProductsPurchased />

        <AvgSalesPerMachines />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(auto-fit, minmax(336px, 1fr))',
        }}>
        <ProductSplit />

        <FrequencyOfTotalSales />

        <PurchasingHours />
      </Box>

      <SalesByVenue />

      <GeographicBreakdown />

      <AdvertisingTable />
    </>
  );
};
