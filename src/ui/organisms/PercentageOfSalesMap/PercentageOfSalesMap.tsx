import { MapChart } from '@/ui/molecules/MapChart';
import { useGetQuantityPerGeography } from '@/lib/api';

export const PercentageOfSalesMap = () => {
  const { data, isLoading } = useGetQuantityPerGeography();

  const items = data?.data.items ?? []

  const chartData = items.map((item) => ({
    regionId: item.geography.id,
    value: item.quantity
  }))

  return (
    <MapChart
      data={chartData}
      title={'Percentage of sales'}
      subtitle={'Lorem ipsum'}
      isLoading={isLoading}
      initialZoom={4}
    />
  );
};
