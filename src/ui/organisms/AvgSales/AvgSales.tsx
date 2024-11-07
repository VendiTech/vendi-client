import { LineChart } from '@/ui/atoms/LineChart';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';

const data = [3, 4, 5, 4, 4, 2];

export const AvgSales = () => {
  return (
    <ChartInfoCard
      title={'Avg. Sales'}
      value={'7.76'}
      growthPercent={-2.123}
      isLoading={false}>
      <LineChart isLoading={false} data={data} color={'bad'} />
    </ChartInfoCard>
  );
};
