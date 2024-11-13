import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { LineChart } from '@/ui/atoms/LineChart';
import { useGetAvgSales, useGetAvgSalesPerRange } from '@/lib/api';
import { useGlobalFilters } from '@/ui/organisms/GlobalFilters';
import dayjs from 'dayjs';
import { DATE_FORMAT, DISPLAY_DATE_FORMAT } from '@/lib/constants/date';

export const AvgSalesPerMachines = () => {
  const { data: avgSales, isLoading: isSalesLoading } = useGetAvgSales();
  const { data: avgSalesPerRange, isLoading: isSalesPerRangeLoading } =
    useGetAvgSalesPerRange();

  const { dateFrom, dateTo } = useGlobalFilters();

  const rangeItems = avgSalesPerRange?.data.items ?? []
  
  const dayjsDateFrom = dayjs(dateFrom, DATE_FORMAT);

  const dayjsDateTo = dayjs(dateTo, DATE_FORMAT);
  const isSameYear = dayjsDateFrom.year() === dayjsDateTo.year();
  const displayRange = isSameYear
    ? `from ${dayjsDateFrom.format('MM.DD')} to ${dayjsDateTo.format('MM.DD')}`
    : `from ${dayjsDateFrom.format(DISPLAY_DATE_FORMAT)} to ${dayjsDateTo.format(DISPLAY_DATE_FORMAT)}`;
  
  const chartData = rangeItems.map((item) => item.quantity);

  const deltaAvgSales = rangeItems[rangeItems.length - 1].quantity - rangeItems[0].quantity

  return (
    <ChartInfoCard
      title={'Avg. Sales per Machines'}
      subtitle={displayRange}
      value={String(avgSales?.data.quantity)}
      growthPercent={deltaAvgSales}
      isLoading={isSalesLoading}>
      <LineChart
        isLoading={isSalesPerRangeLoading}
        data={chartData || []}
        color={'good'}
      />
    </ChartInfoCard>
  );
};
