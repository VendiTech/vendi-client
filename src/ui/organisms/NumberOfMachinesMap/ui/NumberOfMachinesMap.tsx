import { MapChart } from '@/ui/molecules/MapChart';
import { useGetMachinesPerGeography } from '../api/useGetMachinesPerGeography';

export const NumberOfMachinesMap = () => {
  const { data, isLoading } = useGetMachinesPerGeography();

  const items = data?.data.items ?? [];

  const chartData = items.map((item) => ({
    regionId: item.geography.id,
    value: item.machines,
    name: item.geography.name,
  }));

  const totalNumberOfMachines = chartData.reduce(
    (acc, curr) => acc + curr.value,
    0,
  );

  return (
    <MapChart
      data={chartData}
      title={'Number of machines'}
      subtitle={`You have ${totalNumberOfMachines} machines in total`}
      initialZoom={4}
      isLoading={isLoading}
    />
  );
};
