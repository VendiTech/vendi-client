import { MapChart } from '@/ui/molecules/MapChart';

export const ProductByGeography = () => {
  return (
    <MapChart
      initialZoom={2}
      title={'Product by Geography'}
      subtitle={'You sold products in 10 locations.'}
      isLoading={false}
    />
  );
};
