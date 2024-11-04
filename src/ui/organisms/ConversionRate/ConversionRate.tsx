import { DoughnutChartWithLegend } from '@/ui/molecules/DoughnutChartWithLegend';
import { ChartCard } from '@/ui/molecules/ChartCard';
import {
  Filter,
  SalesAdvertisingFilter,
  SalesAdvertisingFilterProvider,
  useSalesAdvertisingFilterContext,
} from '@/ui/molecules/SalesAdvertisingFilter';

export const salesData = [
  { title: 'Returning customers', value: 171 },
  { title: 'New customers', value: 845, hideAtChart: true },
];

export const advertisingData = [
  { title: 'Returning customers', value: 300 },
  { title: 'New customers', value: 1200, hideAtChart: true },
];

const ConversionRateInner = () => {
  const { filter } = useSalesAdvertisingFilterContext();

  return (
    <ChartCard actions={<SalesAdvertisingFilter />} title={'Conversion Rate'}>
      <DoughnutChartWithLegend
        isLoading={false}
        showAbsoluteValues
        showPercent
        data={filter === Filter.Sales ? salesData : advertisingData}
        growthPercent={12.5454}
        direction={'column'}
      />
    </ChartCard>
  );
};

export const ConversionRate = () => {
  return (
    <SalesAdvertisingFilterProvider>
      <ConversionRateInner />
    </SalesAdvertisingFilterProvider>
  );
};
