import { LineChart } from '@/ui/atoms/LineChart';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';

const data = [1, 2, 1, 2, 3, 1];

export const Exposures = () => {
  return (
    <ChartInfoCard
      title={'Exposure'}
      value={'15s'}
      isLoading={false}
      startValue={4}
      endValue={21}>
      <LineChart isLoading={false} data={data} color={'good'} />
    </ChartInfoCard>
  );
};
