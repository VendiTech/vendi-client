import { impressionByMonth } from '@/assets/mocks/impressions-by-month';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { MultiLineChart } from '@/ui/atoms/MultiLineChart';

export const ImpressionsByMonth = () => {
  const xLabelsCallback = (value: number) => {
    if (value % 7 !== 0) return;

    return 'Week ' + Math.round(value / 7 + 1);
  };

  return (
    <ChartCard title={'Impressions by month'} subtitle={'Lorem ipsum'}>
      <MultiLineChart
        data={impressionByMonth}
        xLabelsCallback={xLabelsCallback}
        sx={{ height: '100%' }}
      />
    </ChartCard>
  );
};
