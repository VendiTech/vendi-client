import { LineChart } from '@/ui/atoms/LineChart';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';

const data = [3, 4, 5, 4, 4, 2];

export const NordicTotalImpressions = () => {
  return (
    <ChartInfoCard
      title={'Nordic Total Impressions'}
      subtitle={'all sites'}
      value={'2,31m'}
      startValue={4}
      endValue={21}
      isLoading={false}>
      <LineChart isLoading={false} data={data} color={'bad'} />
    </ChartInfoCard>
  );
};
