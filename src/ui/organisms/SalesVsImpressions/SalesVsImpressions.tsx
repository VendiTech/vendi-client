import { ChartCard } from '@/ui/molecules/ChartCard';
import { BarChart } from '@/ui/atoms/BarChart';
import { ChartLegend } from '@/ui/atoms/ChartLegend';
import { colors } from '@/assets/styles/variables';
import { useGetAvgSalesPerRange, useGetImpressionsPerRange } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { getTimeFrame } from '@/lib/helpers/get-time-frame';
import { getDisplayTimeFrame } from '@/lib/helpers/getDisplayTimeFrame';

export const SalesVsImpressions = () => {
  const {
    data: salesData,
    isLoading: isSalesLoading,
    isError: isSalesError,
  } = useGetAvgSalesPerRange();
  const {
    data: impressionsData,
    isLoading: isImpressionsLoading,
    isError: isImpressionsError,
  } = useGetImpressionsPerRange();

  const sales = salesData?.data.items ?? [];
  const impressions = impressionsData?.data.items ?? [];

  const { dateFrom, dateTo } = useGlobalFilters();
  const timeFrame = getTimeFrame(dateFrom, dateTo);

  const chartData = sales.map((item, i) => ({
    label: getDisplayTimeFrame(item.time_frame, timeFrame),
    value: item.quantity,
    lineValue: impressions[i]?.impressions,
  }));

  return (
    <ChartCard
      title={`Sales vs Impressions by ${timeFrame}`}
      subtitle={'Lorem ipsum'}
      isError={isSalesError || isImpressionsError}>
      <BarChart
        withLine
        data={chartData}
        isLoading={isSalesLoading || isImpressionsLoading}
      />

      <ChartLegend legend={[{ title: 'Impressions', color: colors.pink300 }]} />
    </ChartCard>
  );
};
