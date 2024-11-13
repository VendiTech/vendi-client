import { MapChart } from '@/ui/molecules/MapChart';
import { useGetGeographies } from '@/lib/api';

export const ProductByGeography = () => {
  const { data, isLoading } = useGetGeographies();

  return (
    <MapChart
      initialZoom={2.5}
      title={'Product by Geography'}
      subtitle={`You sold products in ${data?.data.items.length} locations.`}
      isLoading={isLoading}
    />
  );
};
