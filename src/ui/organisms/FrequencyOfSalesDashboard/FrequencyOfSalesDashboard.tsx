import { useGetFrequencyOfSales } from '@/lib/api';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { BarChart } from '@/ui/atoms/BarChart';

export const FrequencyOfSalesDashboard = () => {
  const { data, isLoading, isError } = useGetFrequencyOfSales();

  const items = data?.data ?? [];

  const chartData = items.map((item) => ({
    label: item.time_period,
    value: item.sales,
  }));

  const total = items.reduce((acc, curr) => acc + curr.sales, 0);

  return (
    <ChartCard
      sx={{ flexGrow: 1 }}
      isLoading={isLoading}
      isError={isError || !total}
      title={'Frequency of Sales'}
      subtitle={`You sold ${total} products in one day`}>
      <BarChart isLoading={isLoading} data={chartData} />
    </ChartCard>
  );
};
