import { Typography } from '@mui/material';
import { ProductSplit } from '@/ui/organisms/ProductSplit';
import { FrequencyOfTotalSales } from '@/ui/organisms/FrequencyOfTotalSales';
import { PurchasingHours } from '@/ui/organisms/PurchasingHours';
import { SalesByVenue } from '@/ui/organisms/SalesByVenue';
import { QuantityOfProductsPurchased } from '@/ui/organisms/Purchases';
import { AvgSalesPerMachines } from '@/ui/organisms/AvgSales';
import { PercentageOfSalesMap } from '@/ui/organisms/PercentageOfSalesMap';
import { NumberOfMachinesMap } from '@/ui/organisms/NumberOfMachinesMap';
import { AvgProductsSoldMap } from '@/ui/organisms/AvgProductsSoldMap';
import { TabsTable } from '@/ui/organisms/DataTable';
import { useSalesOverviewTableProps } from '@/ui/organisms/SalesOverviewTable';
import { useSalesTableProps } from '@/ui/organisms/SalesTable';
import { Flexbox } from '@/ui/atoms/Flexbox';

export const SalesTemplate = () => {
  const overviewTableProps = useSalesOverviewTableProps();
  const salesTableProps = useSalesTableProps();

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
        <NumberOfMachinesMap />

        <AvgProductsSoldMap />

        <PercentageOfSalesMap />
      </Flexbox>

      <TabsTable
        tabs={[
          { title: 'Overview', tableProps: overviewTableProps },
          { title: 'Sales', tableProps: salesTableProps },
        ]}
      />
    </>
  );
};
