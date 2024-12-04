import { getDisplayDatesInterval } from '@/lib/helpers/get-display-dates-interval';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { useGetQuantityByProduct, useGetQuantityPerProduct } from '@/lib/api';
import { DoughnutChartWithLegend } from '@/ui/molecules/DoughnutChartWithLegend';
import { ChartCard } from '@/ui/molecules/ChartCard';

export const ProductSplit = () => {
  const { dateFrom, dateTo } = useGlobalFilters();

  const {
    data: salesData,
    isLoading: isSalesLoading,
    isError: isSalesError,
  } = useGetQuantityPerProduct();

  const {
    data: salesStatistic,
    isLoading: isStatisticLoading,
    isError: isStatisticError,
  } = useGetQuantityByProduct();

  const items = salesData?.data.items ?? [];

  const totalSalesCount = items.reduce((acc, curr) => curr.quantity + acc, 0);

  const chartData = items.map((item) => ({
    title: item.category_name,
    value: item.quantity,
  }));

  const subtitle = `You sold ${Math.round(totalSalesCount ?? 0)} products ${getDisplayDatesInterval(dateFrom, dateTo)}`;

  return (
    <ChartCard
      isError={isSalesError || isStatisticError || !chartData.length}
      isLoading={isSalesLoading || isStatisticLoading}
      title={'Product Split'}
      subtitle={subtitle}>
      <DoughnutChartWithLegend
        showPercent={false}
        isLoading={isSalesLoading || isStatisticLoading}
        data={chartData}
        previousValue={salesStatistic?.data.previous_month_statistic ?? 0}
        currentValue={salesStatistic?.data.quantity ?? 0}
      />
    </ChartCard>
  );
};
