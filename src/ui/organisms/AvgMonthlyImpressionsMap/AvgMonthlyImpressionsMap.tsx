import { useGetImpressionsPerGeography } from '@/lib/api';
import { MapChart } from '@/ui/molecules/MapChart';

export const AvgMonthlyImpressionsMap = () => {
  const { data, isLoading } = useGetImpressionsPerGeography();

  const items = data?.data.items ?? [];

  const chartData = items.map((item) => ({
    regionId: item.geography.id,
    value: item.avg_impressions,
  }));

  return (
    <MapChart
      data={chartData}
      title={'Avg. monthly impressions'}
      subtitle={'Lorem ipsum'}
      isLoading={isLoading}
      initialZoom={4}
    />
  );
};
