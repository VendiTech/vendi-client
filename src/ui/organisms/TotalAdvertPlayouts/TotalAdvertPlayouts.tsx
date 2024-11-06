import { LineChart } from '@/ui/atoms/LineChart';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';

const data = [1, 2, 1, 2, 3, 1];

export const TotalAdvertPlayouts = () => {
  return (
    <ChartInfoCard
      title={'Total Advert Playouts'}
      subtitle={'all sites'}
      value={'129,438'}
      isLoading={false}
      growthPercent={0.4}>
      <LineChart isLoading={false} data={data} color={'good'} />
    </ChartInfoCard>
  );
};
