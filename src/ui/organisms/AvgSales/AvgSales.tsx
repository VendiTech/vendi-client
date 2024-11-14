import { useGetAvgSales, useGetAvgSalesPerRange } from '@/lib/api';
import { LineChart } from '@/ui/atoms/LineChart';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';

export const AvgSales = () => {
  const {
    data: avgSales,
    isLoading: isSalesLoading,
    isError: isSalesError,
  } = useGetAvgSales();
  const {
    data: salesPerRange,
    isLoading: isRangeLoading,
    isError: isRangeError,
  } = useGetAvgSalesPerRange();

  const rangeItems =
    salesPerRange?.data.items.map((item) => item.quantity) ?? [];

  const deltaSales = rangeItems[rangeItems.length - 1] - rangeItems[0];

  return (
    <ChartInfoCard
      title={'Avg. Sales'}
      value={String(avgSales?.data.quantity)}
      growthPercent={deltaSales}
      isLoading={isSalesLoading}
      isError={isSalesError || isRangeError}>
      <LineChart
        isLoading={isRangeLoading}
        data={rangeItems}
        color={deltaSales > 0 ? 'good' : 'bad'}
      />
    </ChartInfoCard>
  );
};
