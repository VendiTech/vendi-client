import { useGetQuantityPerGeography } from '@/lib/api';
import { MapChart } from '@/ui/molecules/MapChart';

export const AvgMonthlyImpressionsMap = () => {
  const { data, isLoading } = useGetQuantityPerGeography();

  const items = data?.data.items ?? [];

  const chartData = items.map((item) => ({
    regionId: item.geography.id,
    value: item.quantity,
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
