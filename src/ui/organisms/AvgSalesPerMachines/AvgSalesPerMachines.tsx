import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { LineChart } from '@/ui/atoms/LineChart';

const data = [1, 2, 1, 2.2, 1.5];

export const AvgSalesPerMachines = () => {
  return (
    <ChartInfoCard
      title={'Avg. Sales per Machines'}
      subtitle={'per month'}
      value={'4.48'}
      growthPercent={0.4}>
      <LineChart data={data} color={'good'} />
    </ChartInfoCard>
  );
};
