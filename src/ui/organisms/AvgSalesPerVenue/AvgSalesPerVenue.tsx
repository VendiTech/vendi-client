import { useGetSalesQuantityByVenue } from '@/lib/api';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { StackedBarChart } from '@/ui/atoms/StackedBarChart';

export const AvgSalesPerVenue = () => {
  const { data, isLoading, isError } = useGetSalesQuantityByVenue();

  const sales = data?.data.items ?? [];
  
  const totalSales = sales.reduce((acc, curr) => acc + curr.quantity, 0);

  const avgSales = Math.round((totalSales / sales.length) * 100) / 100;
  
  const isNoData = !sales.length || isError

  const chartItems = sales.map((item) => [+item.quantity, totalSales]);

  return (
    <ChartInfoCard
      title={'Avg. Sales per Venue'}
      value={String(avgSales)}
      startValue={1}
      endValue={2}
      isError={isNoData}
      isLoading={isLoading}
    >
      <StackedBarChart variant={'good'} data={chartItems} isLoading={isLoading} />
    </ChartInfoCard>
  );
};
