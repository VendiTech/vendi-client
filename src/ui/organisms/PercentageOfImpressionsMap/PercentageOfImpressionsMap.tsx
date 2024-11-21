import { useGetQuantityPerGeography } from '@/lib/api';
import { MapChart } from '@/ui/molecules/MapChart';

export const PercentageOfImpressionsMap = () => {
  const { data, isLoading } = useGetQuantityPerGeography();

  const items = data?.data.items ?? [];

  const chartData = items.map((item) => ({
    regionId: item.geography.id,
    value: item.quantity,
  }));

  return (
    <MapChart
      data={chartData}
      title={'Percentage of impressions'}
      subtitle={'Lorem ipsum'}
      initialZoom={4}
      isLoading={isLoading}
    />
  );
};
