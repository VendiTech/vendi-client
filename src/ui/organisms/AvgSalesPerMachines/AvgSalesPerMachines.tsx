import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { LineChart } from '@/ui/atoms/LineChart';
import { useGetAvgSales, useGetAvgSalesPerRange } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { getDisplayDatesInterval } from '@/lib/helpers/get-display-dates-interval';

export const AvgSalesPerMachines = () => {
  const {
    data: avgSales,
    isLoading: isSalesLoading,
    isError: isSalesError,
  } = useGetAvgSales();
  const {
    data: avgSalesPerRange,
    isLoading: isSalesPerRangeLoading,
    isError: isSalesPerRangeError,
  } = useGetAvgSalesPerRange();

  const { dateFrom, dateTo } = useGlobalFilters();

  const rangeItems =
    avgSalesPerRange?.data.items.map((item) => item.quantity) ?? [];

  const displayRange = getDisplayDatesInterval(dateFrom, dateTo);
  
  const startValue = rangeItems[0]
  const endValue = rangeItems[rangeItems.length - 1]

  return (
    <ChartInfoCard
      title={'Avg. Sales per Machines'}
      subtitle={displayRange}
      value={String(avgSales?.data.quantity)}
      startValue={startValue}
      endValue={endValue}
      isLoading={isSalesLoading}
      isError={isSalesError || isSalesPerRangeError}>
      <LineChart
        isLoading={isSalesPerRangeLoading}
        data={rangeItems}
        color={endValue - startValue > 0 ? 'good' : 'bad'}
      />
    </ChartInfoCard>
  );
};
