import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { LineChart } from '@/ui/atoms/LineChart';

const data = [1, 2, 1, 3, 2];

export const QuantityOfProductsPurchased = () => {
  return (
    <ChartInfoCard
      title={'Quantity of Products Purchased'}
      value={'224'}
      growthPercent={5.3}>
      <LineChart data={data} color={'good'} />
    </ChartInfoCard>
  );
};
