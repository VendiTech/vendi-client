import { ChartCard } from '@/ui/molecules/ChartCard';
import { BarChart } from '@/ui/atoms/BarChart';

const data = [
  { label: 'Venue 1', value: 40 },
  { label: 'Venue 2', value: 170 },
  { label: 'Venue 3', value: 95 },
  { label: 'Venue 4', value: 120 },
  { label: 'Venue 5', value: 49 },
  { label: 'Venue 6', value: 73 },
];

export const ImpressionsByVenue = () => {
  return (
    <ChartCard
      title={'Impressions by venue over time'}
      subtitle={'Lorem ipsum dolor sit amet.'}>
      <BarChart data={data} />
    </ChartCard>
  );
};
