import { LineChart } from '@/ui/atoms/LineChart';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { useGetAdvertsPlayout, useGetAdvertsPlayoutStatistic } from '@/lib/api';
import { parseNumber } from '@/lib/helpers/parse-number';

export const TotalAdvertPlayouts = () => {
  const { data, isLoading, isError } = useGetAdvertsPlayout();
  const {
    data: statistic,
    isLoading: isStatisticLoading,
    isError: isStatisticError,
  } = useGetAdvertsPlayoutStatistic();

  const chartData = (data?.data.items ?? []).map(
    (item) => item.advert_playouts,
  );

  const total = statistic?.data.advert_playouts ?? 0;
  const previousTotal = statistic?.data.previous_month_statistic ?? 0;

  return (
    <ChartInfoCard
      title={'Total Advert Playouts'}
      subtitle={'all sites'}
      displayValue={parseNumber(total)}
      isLoading={isLoading || isStatisticLoading}
      isError={isError || !total || isStatisticError}
      previousValue={previousTotal}
      currentValue={total}>
      <LineChart isLoading={isLoading} data={chartData} color={'good'} />
    </ChartInfoCard>
  );
};
