import { DoughnutChartWithLegend } from '@/ui/molecules/DoughnutChartWithLegend';
import { ChartCard } from '@/ui/molecules/ChartCard';
import {
  Filter,
  SalesAdvertisingFilter,
  SalesAdvertisingFilterProvider,
  useSalesAdvertisingFilterContext,
} from '@/ui/molecules/SalesAdvertisingFilter';

export const salesData = [
  { title: 'Mint', value: 288 },
  { title: 'Spearmint', value: 291 },
  { title: 'Watermelon', value: 431 },
];

export const advertisingData = [
  { title: 'Mint', value: 111 },
  { title: 'Spearmint', value: 222 },
  { title: 'Watermelon', value: 333 },
];

const ProductSplitInner = () => {
  const { filter } = useSalesAdvertisingFilterContext();

  return (
    <ChartCard
      isLoading={false}
      title={'Product Split'}
      subtitle={'You sold 924 products in one day.'}
      actions={<SalesAdvertisingFilter />}>
      <DoughnutChartWithLegend
        isLoading={false}
        data={filter === Filter.Sales ? salesData : advertisingData}
        growthPercent={5.0999}
      />
    </ChartCard>
  );
};

export const ProductSplit = () => {
  return (
    <SalesAdvertisingFilterProvider>
      <ProductSplitInner />
    </SalesAdvertisingFilterProvider>
  );
};
