import { useGetImpressionsPerGeography } from '@/lib/api';
import { MapChart } from '@/ui/molecules/MapChart';

export const AvgMonthlyImpressionsMap = () => {
  const { data, isLoading } = useGetImpressionsPerGeography();

  const items = data?.data.items ?? [];

  const chartData = items.map((item) => ({
    regionId: item.geography.id,
    value: item.avg_impressions,
  }));

  const avgImpressions = chartData.length
    ? Math.round(
        chartData.reduce((acc, curr) => acc + curr.value, 0) / chartData.length,
      )
    : 0;

  return (
    <MapChart
      data={chartData}
      title={'Avg. monthly impressions'}
      subtitle={`You have ${avgImpressions} impressions on average per location`}
      isLoading={isLoading}
      initialZoom={4}
    />
  );
};
