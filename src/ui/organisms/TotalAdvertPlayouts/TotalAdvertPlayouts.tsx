import { LineChart } from '@/ui/atoms/LineChart';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { useGetAdvertsPlayout } from '@/lib/api';
import { parseNumber } from '@/lib/helpers/parse-number';

const data = [1, 2, 1, 2, 3, 1];

export const TotalAdvertPlayouts = () => {
  const {
    data: advertsPlayout,
    isLoading: isAdvertsPlayoutLoading,
    isError: isAdvertsPlayoutError,
  } = useGetAdvertsPlayout();

  const totalAdvertsPlayout = advertsPlayout?.data.advert_playouts ?? 0;

  return (
    <ChartInfoCard
      title={'Total Advert Playouts'}
      subtitle={'all sites'}
      value={parseNumber(totalAdvertsPlayout)}
      isLoading={isAdvertsPlayoutLoading}
      isError={isAdvertsPlayoutError || !totalAdvertsPlayout}
      startValue={4}
      endValue={21}>
      <LineChart isLoading={false} data={data} color={'good'} />
    </ChartInfoCard>
  );
};
