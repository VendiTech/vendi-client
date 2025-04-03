import { useGetSalesQuantityByVenue } from '@/lib/api';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { BarChart } from '@/ui/atoms/BarChart';

export const SalesByVenue = () => {
  const { data, isLoading, isError, fetchNextPage, total } =
    useGetSalesQuantityByVenue();

  const chartData =
    data.map((item) => ({
      label: item.venue,
      value: item.quantity,
    })) ?? [];

  return (
    <ChartCard
      isError={isError || !chartData.length}
      title={'Sales by venue over time'}
      subtitle={`You have sales in ${total} venue`}>
      <BarChart
        fetchNext={fetchNextPage}
        isLoading={isLoading}
        data={chartData}
      />
    </ChartCard>
  );
};
