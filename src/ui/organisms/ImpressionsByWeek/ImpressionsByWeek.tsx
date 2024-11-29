import dayjs from 'dayjs';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { LineChart } from '@/ui/atoms/LineChart';
import { useGetImpressionsPerRange } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { getTimeFrame } from '@/lib/helpers/get-time-frame';
import { getDisplayTimeFrame } from '@/lib/helpers/getDisplayTimeFrame';

export const ImpressionsByWeek = () => {
  const { data, isLoading, isError } = useGetImpressionsPerRange();

  const items = data?.data.items ?? [];

  const { dateFrom, dateTo } = useGlobalFilters();
  const timeframe = getTimeFrame(dateFrom, dateTo);

  const chartData = items.map((item) => +item.impressions);
  const chartLabels = items.map((item) => getDisplayTimeFrame(item.time_frame, timeframe));

  return (
    <ChartCard
      title={`Impressions by ${timeframe}`}
      subtitle={`Total impressions on a ${timeframe} by ${timeframe} basis compared.`}
      isError={isError}>
      <LineChart
        data={chartData}
        isLoading={isLoading}
        labels={chartLabels}
        color={'accent'}
        showGradient={false}
        showScales
        tooltipEnabled
      />
    </ChartCard>
  );
};
