import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { LineChart } from '@/ui/atoms/LineChart';
import { useGetAvgSales, useGetAvgSalesPerRange } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import dayjs from 'dayjs';
import { DATE_FORMAT, DISPLAY_DATE_FORMAT } from '@/lib/constants/date';

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

  const dayjsDateFrom = dayjs(dateFrom, DATE_FORMAT);
  const dayjsDateTo = dayjs(dateTo, DATE_FORMAT);
  const isSameYear = dayjsDateFrom.year() === dayjsDateTo.year();
  const displayRange = isSameYear
    ? `from ${dayjsDateFrom.format('MM.DD')} to ${dayjsDateTo.format('MM.DD')}`
    : `from ${dayjsDateFrom.format(DISPLAY_DATE_FORMAT)} to ${dayjsDateTo.format(DISPLAY_DATE_FORMAT)}`;

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
