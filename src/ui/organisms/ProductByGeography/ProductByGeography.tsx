import { NoData } from '@/ui/atoms/NoData';
import { locationSales } from '@/assets/mocks/charts';
import { LocationSales } from '@/ui/molecules/LocationSales';
import { ChartCard } from '@/ui/molecules/ChartCard';

export const ProductByGeography = () => {
  const isLoading = false;

  return (
    <ChartCard
      title={'Product by Geography'}
      subtitle={'You sold products in 10 locations.'}>
      {isLoading ? (
        <NoData />
      ) : (
        locationSales.map((item) => (
          <LocationSales key={item.location} {...item} highlightOpacity={0.6} />
        ))
      )}
    </ChartCard>
  );
};
