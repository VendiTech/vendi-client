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

  const deltaAvgSales = rangeItems[rangeItems.length - 1] - rangeItems[0];

  return (
    <ChartInfoCard
      title={'Avg. Sales per Machines'}
      subtitle={displayRange}
      value={String(avgSales?.data.quantity)}
      growthPercent={deltaAvgSales}
      isLoading={isSalesLoading}
      isError={isSalesError || isSalesPerRangeError}>
      <LineChart
        isLoading={isSalesPerRangeLoading}
        data={rangeItems}
        color={deltaAvgSales > 0 ? 'good' : 'bad'}
      />
    </ChartInfoCard>
  );
};
