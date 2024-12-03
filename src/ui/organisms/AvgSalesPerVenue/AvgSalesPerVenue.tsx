import { useGetSalesQuantityByVenue } from '@/lib/api';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { StackedBarChart } from '@/ui/atoms/StackedBarChart';

export const AvgSalesPerVenue = () => {
  const { data, isLoading, isError } = useGetSalesQuantityByVenue();

  const sales = data?.data.items ?? [];

  const totalSales = sales.reduce((acc, curr) => acc + curr.quantity, 0);

  const isNoData = !sales.length || isError;

  const chartItems = sales.map((item) => [+item.quantity, totalSales]);

  const avgSales = Math.round((totalSales / sales.length) * 100) / 100;
  //TODO get value from api
  const previousAvgSales = avgSales - 10;

  return (
    <ChartInfoCard
      title={'Avg. Sales per Venue'}
      displayValue={String(avgSales)}
      previousValue={previousAvgSales}
      currentValue={avgSales}
      isError={isNoData}
      isLoading={isLoading}>
      <StackedBarChart
        variant={avgSales - previousAvgSales > 0 ? 'good' : 'bad'}
        data={chartItems}
        isLoading={isLoading}
      />
    </ChartInfoCard>
  );
};
