import { ChartCard } from '@/ui/molecules/ChartCard';
import { BarChart } from '@/ui/atoms/BarChart';
import { ChartLegend } from '@/ui/atoms/ChartLegend';
import { colors } from '@/assets/styles/variables';

const data = [
  { label: 'March', value: 62, lineValue: 28 },
  { label: 'April', value: 240, lineValue: 58 },
  { label: 'May', value: 149, lineValue: 120 },
  { label: 'June', value: 173, lineValue: 160 },
  { label: 'July', value: 75, lineValue: 48 },
  { label: 'August', value: 110, lineValue: 60 },
];

export const SalesVsImpressions = () => {
  return (
    <ChartCard title={'Sales vs Impressions'} subtitle={'Lorem ipsum'}>
      <BarChart withLine data={data} />

      <ChartLegend legend={[{ title: 'Impressions', color: colors.pink300 }]} />
    </ChartCard>
  );
};
