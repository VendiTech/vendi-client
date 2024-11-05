import { LineChart } from '@/ui/atoms/LineChart';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';

const data = [5, 2, 4, 3.3, 5];

export const SecondsOfExposure = () => {
  return (
    <ChartInfoCard
      title={'Seconds of Exposure'}
      subtitle={'per min'}
      value={'15s'}
      growthPercent={5.3}
      isLoading={false}>
      <LineChart
        isLoading={false}
        data={data}
        color={'good'}
        sx={{ width: '100%', height: '100%' }}
      />
    </ChartInfoCard>
  );
};
