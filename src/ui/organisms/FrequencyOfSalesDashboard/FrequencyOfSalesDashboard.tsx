import { useGetFrequencyOfSales } from '@/lib/api';
import { ChartCard } from '@/ui/molecules/ChartCard';
import {
  SalesAdvertisingFilter,
  SalesAdvertisingFilterProvider,
} from '@/ui/molecules/SalesAdvertisingFilter';
import { BarChart } from '@/ui/atoms/BarChart';

const FrequencyOfSalesInner = () => {
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
      subtitle={`You sold ${total} products in one day`}
      actions={<SalesAdvertisingFilter />}>
      <BarChart isLoading={isLoading} data={chartData} />
    </ChartCard>
  );
};

export const FrequencyOfSalesDashboard = () => {
  return (
    <SalesAdvertisingFilterProvider>
      <FrequencyOfSalesInner />
    </SalesAdvertisingFilterProvider>
  );
};
