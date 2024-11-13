import { LineChart } from '@/ui/atoms/LineChart';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { useGetAvgSales } from '@/lib/api';

const data = [3, 4, 5, 4, 4, 2];

export const AvgSales = () => {
  const { data: avgSales, isLoading: isSalesLoading } = useGetAvgSales();
  
  return (
    <ChartInfoCard
      title={'Avg. Sales'}
      value={String(avgSales?.data.quantity)}
      growthPercent={-2.123}
      isLoading={isSalesLoading}>
      <LineChart isLoading={false} data={data} color={'bad'} />
    </ChartInfoCard>
  );
};
