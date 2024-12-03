import { LineChart } from '@/ui/atoms/LineChart';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { useGetAdvertsPlayout } from '@/lib/api';
import { parseNumber } from '@/lib/helpers/parse-number';

export const TotalAdvertPlayouts = () => {
  const { data, isLoading, isError } = useGetAdvertsPlayout();

  const chartData = (data?.data.items ?? []).map(
    (item) => item.advert_playouts,
  );

  const total = chartData.reduce((acc, curr) => acc + curr, 0);

  return (
    <ChartInfoCard
      title={'Total Advert Playouts'}
      subtitle={'all sites'}
      value={parseNumber(total)}
      isLoading={isLoading}
      isError={isError || !total}
      startValue={4}
      endValue={21}>
      <LineChart isLoading={isLoading} data={chartData} color={'good'} />
    </ChartInfoCard>
  );
};
