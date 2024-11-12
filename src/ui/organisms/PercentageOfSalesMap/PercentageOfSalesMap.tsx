import { MapChart } from '@/ui/molecules/MapChart';

export const PercentageOfSalesMap = () => {
  return (
    <MapChart
      title={'Percentage of sales'}
      subtitle={'Lorem ipsum'}
      isLoading={false}
      initialZoom={4}
    />
  );
};
