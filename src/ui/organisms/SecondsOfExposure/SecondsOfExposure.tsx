import { LineChart } from '@/ui/atoms/LineChart';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';

const data = [5, 2, 4, 3.3, 5];

export const SecondsOfExposure = () => {
  return (
    <ChartInfoCard
      title={'Seconds of Exposure'}
      subtitle={'per min'}
      value={'15s'}
      startValue={4}
      endValue={21}
      isLoading={false}>
      <LineChart isLoading={false} data={data} color={'good'} />
    </ChartInfoCard>
  );
};
