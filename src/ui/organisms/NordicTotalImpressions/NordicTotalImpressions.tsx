import { LineChart } from '@/ui/atoms/LineChart';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';

const data = [3, 4, 5, 4, 4, 2];

export const NordicTotalImpressions = () => {
  return (
    <ChartInfoCard
      title={'Nordic Total Impressions'}
      subtitle={'all sites'}
      value={'2,31m'}
      growthPercent={-2.1}
      isLoading={false}>
      <LineChart isLoading={false} data={data} color={'bad'} />
    </ChartInfoCard>
  );
};
