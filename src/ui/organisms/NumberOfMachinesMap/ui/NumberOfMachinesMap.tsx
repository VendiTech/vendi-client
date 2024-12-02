import { MapChart } from '@/ui/molecules/MapChart';
import { useGetMachinesPerGeography } from '../api/useGetMachinesPerGeography';

export const NumberOfMachinesMap = () => {
  const { data, isLoading } = useGetMachinesPerGeography();

  const items = data?.data.items ?? [];

  const chartData = items.map((item) => ({
    regionId: item.geography.id,
    value: item.machines,
  }));

  return (
    <MapChart
      data={chartData}
      title={'Number of machines'}
      subtitle={'Lorem'}
      initialZoom={4}
      isLoading={isLoading}
    />
  );
};
