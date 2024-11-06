import { salesByVenue } from '@/assets/mocks/charts';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { BarChart } from '@/ui/atoms/BarChart';

export const SalesByVenue = () => {
  return (
    <ChartCard title={'Sales by venue over time'} subtitle={'Lorem ipsum'}>
      <BarChart data={salesByVenue} />
    </ChartCard>
  );
};
