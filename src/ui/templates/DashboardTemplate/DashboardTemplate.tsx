import { Banner } from '@/ui/organisms/Banner';
import { UnitsSold } from '@/ui/organisms/UnitsSold';
import { ProductSplit } from '@/ui/organisms/ProductSplit';
import { FrequencyOfSalesDashboard } from '@/ui/organisms/FrequencyOfSalesDashboard';
import { ProductByGeography } from '@/ui/organisms/ProductByGeography';
import { ConversionRate } from '@/ui/organisms/ConversionRate';
import { useSalesOverviewTableProps } from '@/ui/organisms/SalesOverviewTable';
import { useAdvertisingOverviewTableProps } from '@/ui/organisms/AdvertisingOverviewTable';
import { useSalesTableProps } from '@/ui/organisms/SalesTable';
import { Purchases } from '@/ui/organisms/Purchases';
import { AvgSales } from '@/ui/organisms/AvgSales';
import { Exposure } from '@/ui/organisms/Exposure';
import { Flexbox } from '@/ui/atoms/Flexbox';
import { TabsTable } from '@/ui/organisms/DataTable';

export const DashboardTemplate = () => {
  const overviewTableProps = useSalesOverviewTableProps()
  const advertisingTableProps = useAdvertisingOverviewTableProps()
  const salesTableProps = useSalesTableProps()
  
  return (
    <>
      <Banner />

      <Flexbox>
        <Purchases />

        <AvgSales />

        <Exposure />
      </Flexbox>

      <UnitsSold />

      <Flexbox>
        <ProductSplit />

        <FrequencyOfSalesDashboard />
      </Flexbox>

      <Flexbox childrenSx={[{ flexGrow: 2, flexBasis: 688 }]}>
        <ProductByGeography />

        <ConversionRate />
      </Flexbox>

      <TabsTable
        tabs={[
          { title: 'Overview', tableProps: overviewTableProps },
          { title: 'Advertising', tableProps: advertisingTableProps },
          { title: 'Sales', tableProps: salesTableProps },
        ]}
      />
    </>
  );
};
