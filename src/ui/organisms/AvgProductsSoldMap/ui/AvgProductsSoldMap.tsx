import { MapChart } from '@/ui/molecules/MapChart';
import { useGetAvgProductsPerGeography } from '../api/useGetAvgProductsPerGeography';

export const AvgProductsSoldMap = () => {
  const { data, isLoading } = useGetAvgProductsPerGeography();

  const items = data?.data.items ?? [];

  const chartData = items.map((item) => ({
    regionId: item.geography.id,
    value: item.products,
  }));

  const avgQuantity = chartData.length
    ? Math.round(chartData.reduce((acc, curr) => acc + curr.value, 0) / chartData.length)
    : 0;

  return (
    <MapChart
      data={chartData}
      title={'Avg. products sold'}
      subtitle={`You sold ${avgQuantity} products on average per location`}
      initialZoom={4}
      isLoading={isLoading}
    />
  );
};
