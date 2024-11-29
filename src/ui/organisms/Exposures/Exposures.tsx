import { useGetAvgExposure } from '@/lib/api';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { LineChart } from '@/ui/atoms/LineChart';

const data = [1, 2, 1, 2, 3, 1];

export const Exposures = () => {
  const { data: avgExposures, isLoading: isAvgExposuresLoading, isError: isAvgExposuresError } = useGetAvgExposure()

  return (
    <ChartInfoCard
      title={'Exposure'}
      value={`${avgExposures}s`}
      isLoading={isAvgExposuresLoading}
      isError={isAvgExposuresError}
      startValue={4}
      endValue={21}>
      <LineChart isLoading={false} data={data} color={'good'} />
    </ChartInfoCard>
  );
};
