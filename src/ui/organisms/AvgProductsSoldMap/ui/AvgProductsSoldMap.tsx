import { MapChart } from '@/ui/molecules/MapChart';
import { useGetAvgProductsPerGeography } from '../api/useGetAvgProductsPerGeography';

export const AvgProductsSoldMap = () => {
  const { data, isLoading } = useGetAvgProductsPerGeography();

  const items = data?.data.items ?? [];

  const chartData = items.map((item) => ({
    regionId: item.geography.id,
    value: item.products,
  }));

  return (
    <MapChart
      data={chartData}
      title={'Avg. products sold'}
      subtitle={'Lorem'}
      initialZoom={4}
      isLoading={isLoading}
    />
  );
};
