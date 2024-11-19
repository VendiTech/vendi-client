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

  const startValue = rangeItems[0];
  const endValue = rangeItems[rangeItems.length - 1];

  return (
    <ChartInfoCard
      title={'Avg. Sales'}
      value={String(avgSales?.data.quantity)}
      startValue={startValue}
      endValue={endValue}
      isLoading={isSalesLoading}
      isError={isSalesError || isRangeError}>
      <LineChart
        isLoading={isRangeLoading}
        data={rangeItems}
        color={endValue - startValue > 0 ? 'good' : 'bad'}
      />
    </ChartInfoCard>
  );
};
