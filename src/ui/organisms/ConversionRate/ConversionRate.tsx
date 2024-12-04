import { useGetConversionRate } from '@/lib/api';
import { DoughnutChartWithLegend } from '@/ui/molecules/DoughnutChartWithLegend';
import { ChartCard } from '@/ui/molecules/ChartCard';

export const ConversionRate = () => {
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
      isError={
        isError || !data?.data.customers_new || !data.data.customers_returning
      }
      title={'Conversion Rate'}>
      <DoughnutChartWithLegend
        isLoading={isLoading}
        showAbsoluteValues
        showPercent
        data={chartData}
        // TODO get values from api
        previousValue={1}
        currentValue={0}
      />
    </ChartCard>
  );
};
