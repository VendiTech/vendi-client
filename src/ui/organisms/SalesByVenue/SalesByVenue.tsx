import { useGetSalesQuantityByVenue } from '@/lib/api';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { BarChart } from '@/ui/atoms/BarChart';

export const SalesByVenue = () => {
  const { data, isLoading, isError } = useGetSalesQuantityByVenue();

  const chartData =
    data?.data.items.map((item) => ({
      label: item.venue,
      value: item.quantity,
    })) ?? [];

  return (
    <ChartCard
      isError={isError || !chartData.length}
      title={'Sales by venue over time'}
      subtitle={`You have sales in ${chartData.length} venue`}>
      <BarChart isLoading={isLoading} data={chartData} />
    </ChartCard>
  );
};
