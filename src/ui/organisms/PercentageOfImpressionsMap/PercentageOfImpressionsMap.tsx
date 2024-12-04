import { useGetImpressionsPerGeography } from '@/lib/api';
import { MapChart } from '@/ui/molecules/MapChart';

export const PercentageOfImpressionsMap = () => {
  const { data, isLoading } = useGetImpressionsPerGeography();

  const items = data?.data.items ?? [];

  const chartData = items.map((item) => ({
    regionId: item.geography.id,
    value: item.impressions,
  }));

  return (
    <MapChart
      data={chartData}
      title={'Percentage of impressions'}
      subtitle={`You have impressions in ${chartData.length} locations`}
      initialZoom={4}
      isLoading={isLoading}
    />
  );
};
