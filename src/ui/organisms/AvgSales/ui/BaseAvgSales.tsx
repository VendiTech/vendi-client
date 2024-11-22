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

  const startValue = rangeItems[0];
  const endValue = rangeItems[rangeItems.length - 1];

  const subtitle = getDisplayDatesInterval(dateFrom, dateTo);

  return (
    <ChartInfoCard
      title={title}
      subtitle={showSubtitle ? subtitle : undefined}
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
