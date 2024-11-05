import { NoData } from '@/ui/atoms/NoData';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { MapChart } from '@/ui/molecules/MapChart';

export const ProductByGeography = () => {
  const isLoading = false;

  return (
    <ChartCard
      title={'Product by Geography'}
      subtitle={'You sold products in 10 locations.'}>
      {isLoading ? <NoData /> : <MapChart />}
    </ChartCard>
  );
};
