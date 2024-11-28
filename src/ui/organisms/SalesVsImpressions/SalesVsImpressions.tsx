import { ChartCard } from '@/ui/molecules/ChartCard';
import { BarChart } from '@/ui/atoms/BarChart';
import { ChartLegend } from '@/ui/atoms/ChartLegend';
import { colors } from '@/assets/styles/variables';
import { useGetAvgSalesPerRange } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { getTimeFrame } from '@/lib/helpers/get-time-frame';
import { getDisplayTimeFrame } from '@/lib/helpers/getDisplayTimeFrame';

export const SalesVsImpressions = () => {
  const { data: salesData, isLoading, isError } = useGetAvgSalesPerRange();

  const { dateFrom, dateTo } = useGlobalFilters();
  const timeFrame = getTimeFrame(dateFrom, dateTo);

  const sales = salesData?.data.items ?? [];

  const chartData = sales.map((item) => ({
    label: getDisplayTimeFrame(item.time_frame, timeFrame),
    value: item.quantity,
    lineValue: Math.random() * item.quantity * 3000,
  }));

  return (
    <ChartCard
      title={`Sales vs Impressions by ${timeFrame}`}
      subtitle={'Lorem ipsum'}
      isError={isError}>
      <BarChart withLine data={chartData} isLoading={isLoading} />

      <ChartLegend legend={[{ title: 'Impressions', color: colors.pink300 }]} />
    </ChartCard>
  );
};
