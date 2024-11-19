import { LineChart } from '@/ui/atoms/LineChart';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';

const data = [5, 2, 4, 3.3, 5];

export const Purchases = () => {
  return (
    <ChartInfoCard
      title={'Purchases'}
      value={'10,423'}
      startValue={4}
      endValue={21}
      isLoading={false}>
      <LineChart isLoading={false} data={data} color={'good'} />
    </ChartInfoCard>
  );
};
