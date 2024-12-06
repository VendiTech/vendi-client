import { useGetConversionRate } from '@/lib/api';
import { DoughnutChartWithLegend } from '@/ui/molecules/DoughnutChartWithLegend';
import { ChartCard } from '@/ui/molecules/ChartCard';

export const ConversionRate = () => {
  const { data, isLoading, isError } = useGetConversionRate();
  const {
    data: statistic,
    isLoading: isStatisticLoading,
    isError: isStatisticError,
  } = useGetConversionRate(true);

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
        isError ||
        isStatisticError ||
        !data?.data.customers_new ||
        !data.data.customers_returning
      }
      title={'Conversion Rate'}>
      <DoughnutChartWithLegend
        isLoading={isLoading || isStatisticLoading}
        showAbsoluteValues
        showPercent
        data={chartData}
        previousValue={statistic?.data.customers_returning ?? 0}
        currentValue={data?.data.customers_returning ?? 0}
      />
    </ChartCard>
  );
};
