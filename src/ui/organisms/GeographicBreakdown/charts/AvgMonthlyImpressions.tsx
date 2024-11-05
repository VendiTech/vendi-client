import { ChartCard } from '@/ui/molecules/ChartCard';
import { MapChart } from '@/ui/molecules/MapChart';

export const AvgMonthlyImpressions = () => {
  return <ChartCard title={'Avg. monthly impressions'} subtitle={'Lorem ipsum'}>
    <MapChart />
  </ChartCard>
}