import { MapChart } from '@/ui/molecules/MapChart';
import { useGetQuantityPerGeography } from '@/lib/api';

export const ProductByGeography = () => {
  const { data, isLoading } = useGetQuantityPerGeography();

  const items = data?.data.items ?? [];

  const chartData = items.map((item) => ({
    regionId: item.geography.id,
    value: item.quantity,
    name: item.geography.name,
  }));

  return (
    <MapChart
      data={chartData}
      initialZoom={2.5}
      title={'Product by Geography'}
      subtitle={`You sold products in ${items.length} locations.`}
      isLoading={isLoading}
    />
  );
};
