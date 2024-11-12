import { MapChart } from '@/ui/molecules/MapChart';

export const AvgMonthlyImpressionsMap = () => {
  return (
    <MapChart
      title={'Avg. monthly impressions'}
      subtitle={'Lorem ipsum'}
      isLoading={false}
      initialZoom={4}
    />
  );
};
