import { useGetAvgImpressionsPerGeography } from '@/lib/api';
import { MapChart } from '@/ui/molecules/MapChart';

export const AvgMonthlyImpressionsMap = () => {
  const { data, isLoading } = useGetAvgImpressionsPerGeography();

  const items = data?.data.items ?? [];
  const geographies = items[items.length - 1]?.geographies ?? [];

  const chartData = geographies.map((item) => ({
    regionId: item.geography.id,
    value: item.impressions,
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
