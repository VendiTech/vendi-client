import { getDisplayDatesInterval } from '@/lib/helpers/get-display-dates-interval';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { useGetQuantityPerProduct } from '@/lib/api';
import { DoughnutChartWithLegend } from '@/ui/molecules/DoughnutChartWithLegend';
import { ChartCard } from '@/ui/molecules/ChartCard';
import {
  SalesAdvertisingFilter,
  SalesAdvertisingFilterProvider,
  useSalesAdvertisingFilterContext,
} from '@/ui/molecules/SalesAdvertisingFilter';

const ProductSplitInner = () => {
  const { filter } = useSalesAdvertisingFilterContext();

  const { dateFrom, dateTo } = useGlobalFilters();

  const {
    data: salesData,
    isLoading: isSalesLoading,
    isError: isSalesError,
  } = useGetQuantityPerProduct();

  const items = salesData?.data.items ?? [];

  const totalSalesCount = items.reduce((acc, curr) => curr.quantity + acc, 0);

  const sorted = [...items].sort(
    (prev, curr) => prev.category_id - curr.category_id,
  );

  const chartData = sorted
    .map((item) => ({
      title: item.category_name,
      value: item.quantity,
    }));

  const subtitle = `You sold ${Math.round(totalSalesCount ?? 0)} products ${getDisplayDatesInterval(dateFrom, dateTo)}`;

  return (
    <ChartCard
      isError={isSalesError}
      isLoading={isSalesLoading}
      title={'Product Split'}
      subtitle={subtitle}
      actions={<SalesAdvertisingFilter />}>
      <DoughnutChartWithLegend
        showPercent={false}
        isLoading={isSalesLoading}
        data={filter === 'Advertising' ? chartData : chartData}
        growthPercent={5.0999}
      />
    </ChartCard>
  );
};

export const ProductSplit = () => {
  return (
    <SalesAdvertisingFilterProvider>
      <ProductSplitInner />
    </SalesAdvertisingFilterProvider>
  );
};
