import { Banner } from '@/ui/organisms/Banner';
import { UnitsSold } from '@/ui/organisms/UnitsSold';
import { ProductSplit } from '@/ui/organisms/ProductSplit';
import { FrequencyOfSalesDashboard } from '@/ui/organisms/FrequencyOfSalesDashboard';
import { ProductByGeography } from '@/ui/organisms/ProductByGeography';
import { ConversionRate } from '@/ui/organisms/ConversionRate';
import { DashboardTable } from '@/ui/organisms/DashboardTable';
import { Purchases } from '@/ui/organisms/Purchases';
import { AvgSales } from '@/ui/organisms/AvgSales';
import { Exposure } from '@/ui/organisms/Exposure';
import { Flexbox } from '@/ui/atoms/Flexbox';

export const DashboardTemplate = () => {
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

      <DashboardTable />
    </>
  );
};
