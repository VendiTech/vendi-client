import { useGetSalesQuantityByVenue } from '@/lib/api';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { StackedBarChart } from '@/ui/atoms/StackedBarChart';

export const AvgSalesPerVenue = () => {
  const { data: sales, isLoading, isError } = useGetSalesQuantityByVenue();
  const {
    data: statistic,
    isLoading: isStatisticLoading,
    isError: isStatisticError,
  } = useGetSalesQuantityByVenue(true);
  
  const totalSales = sales.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPreviousSales = statistic.reduce(
    (acc, curr) => acc + curr.quantity,
    0,
  );

  const isNoData = !sales.length || isError || isStatisticError;

  const chartItems = sales.map((item) => [+item.quantity, totalSales]);

  const avgSales = Math.round((totalSales / sales.length) * 100) / 100;

  return (
    <ChartInfoCard
      title={'Avg. Sales per Venue'}
      displayValue={String(avgSales)}
      previousValue={totalPreviousSales}
      currentValue={totalSales}
      isError={isNoData}
      isLoading={isLoading || isStatisticLoading}>
      <StackedBarChart
        variant={totalSales > totalPreviousSales ? 'good' : 'bad'}
        data={chartItems}
        isLoading={isLoading}
      />
    </ChartInfoCard>
  );
};
