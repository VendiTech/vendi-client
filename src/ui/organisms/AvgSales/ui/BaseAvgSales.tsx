import { useGetAvgSales, useGetAvgSalesPerRange } from '@/lib/api';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { LineChart } from '@/ui/atoms/LineChart';
import { getDisplayDatesInterval } from '@/lib/helpers/get-display-dates-interval';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

type Props = {
  title: string;
  filterByProduct?: boolean;
  showSubtitle?: boolean;
};

export const BaseAvgSales = (props: Props) => {
  const { title, filterByProduct, showSubtitle } = props;

  const {
    data: avgSales,
    isLoading: isSalesLoading,
    isError: isSalesError,
  } = useGetAvgSales(filterByProduct);
  const {
    data: salesPerRange,
    isLoading: isRangeLoading,
    isError: isRangeError,
  } = useGetAvgSalesPerRange(filterByProduct);

  const { dateFrom, dateTo } = useGlobalFilters();

  const rangeItems =
    salesPerRange?.data.items.map((item) => item.quantity) ?? [];

  const subtitle = getDisplayDatesInterval(dateFrom, dateTo);

  const currentValue = avgSales?.data.quantity ?? 0;
  const previousValue = avgSales?.data.previous_month_statistic ?? 0;

  return (
    <ChartInfoCard
      title={title}
      subtitle={showSubtitle ? subtitle : undefined}
      displayValue={String(currentValue)}
      previousValue={previousValue}
      currentValue={currentValue}
      isLoading={isSalesLoading}
      isError={isSalesError || isRangeError || !currentValue}>
      <LineChart
        isLoading={isRangeLoading}
        data={rangeItems}
        color={currentValue - previousValue > 0 ? 'good' : 'bad'}
      />
    </ChartInfoCard>
  );
};
