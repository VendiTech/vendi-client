import { useGetConversionRate } from '@/lib/api';
import { DoughnutChartWithLegend } from '@/ui/molecules/DoughnutChartWithLegend';
import { ChartCard } from '@/ui/molecules/ChartCard';
import {
  SalesAdvertisingFilter,
  SalesAdvertisingFilterProvider,
} from '@/ui/molecules/SalesAdvertisingFilter';

const ConversionRateInner = () => {
  const { data, isLoading, isError } = useGetConversionRate();

  const chartData = [
    {
      title: 'Returning customers',
      value: data?.data.customers_returning ?? 0,
    },
    {
      title: 'New customers',
      value: data?.data.customers_new ?? 0,
      hideAtChart: true,
    },
  ];

  return (
    <ChartCard
      isError={isError || !data?.data.customers_returning}
      actions={<SalesAdvertisingFilter />}
      title={'Conversion Rate'}>
      <DoughnutChartWithLegend
        isLoading={isLoading}
        showAbsoluteValues
        showPercent
        data={chartData}
        growthPercent={12.5454}
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
