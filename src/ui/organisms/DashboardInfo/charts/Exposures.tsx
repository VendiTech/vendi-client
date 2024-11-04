import { LineChart } from '@/ui/atoms/LineChart';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';

const data = [1, 2, 1, 2, 3, 1];

export const Exposures = () => {
  return (
    <ChartInfoCard
      title={'Exposure'}
      value={'15s'}
      isLoading={false}
      growthPercent={5.3123}>
      <LineChart
        isLoading={false}
        data={data}
        color={'good'}
        sx={{ width: '100%', height: '100%' }}
      />
    </ChartInfoCard>
  );
};
