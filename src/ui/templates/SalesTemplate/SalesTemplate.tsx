import { Typography } from '@mui/material';
import { ProductSplit } from '@/ui/organisms/ProductSplit';
import { FrequencyOfTotalSales } from '@/ui/organisms/FrequencyOfTotalSales';
import { PurchasingHours } from '@/ui/organisms/PurchasingHours';
import { SalesByVenue } from '@/ui/organisms/SalesByVenue';
import { AdvertisingTable } from '@/ui/organisms/AdvertisingTable';
import { QuantityOfProductsPurchased } from '@/ui/organisms/Purchases';
import { AvgSalesPerMachines } from '@/ui/organisms/AvgSales';
import { PercentageOfImpressionsMap } from '@/ui/organisms/PercentageOfImpressionsMap';
import { AvgMonthlyImpressionsMap } from '@/ui/organisms/AvgMonthlyImpressionsMap';
import { PercentageOfSalesMap } from '@/ui/organisms/PercentageOfSalesMap';
import { Flexbox } from '@/ui/atoms/Flexbox';

export const SalesTemplate = () => {
  return (
    <>
      <Flexbox>
        <QuantityOfProductsPurchased />

        <AvgSalesPerMachines />
      </Flexbox>

      <Flexbox>
        <ProductSplit />

        <FrequencyOfTotalSales />

        <PurchasingHours />
      </Flexbox>

      <SalesByVenue />

      <Typography
        variant={'sm-medium'}
        sx={{ color: 'var(--slate-900)', pt: 2 }}>
        Geographic breakdown
      </Typography>

      <Flexbox>
        <PercentageOfImpressionsMap />

        <AvgMonthlyImpressionsMap />

        <PercentageOfSalesMap />
      </Flexbox>

      <AdvertisingTable />
    </>
  );
};
