import { useGetAvgExposure, useGetExposurePerRange } from '@/lib/api';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { LineChart } from '@/ui/atoms/LineChart';

export const Exposures = () => {
  const {
    data: avgExposures,
    isLoading: isAvgExposuresLoading,
    isError: isAvgExposuresError,
  } = useGetAvgExposure();
  const {
    data: exposurePerRange,
    isLoading: isRangeLoading,
    isError: isRangeError,
  } = useGetExposurePerRange();

  const chartData = (exposurePerRange?.data.items ?? []).map(
    (item) => item.seconds_exposure,
  );

  return (
    <ChartInfoCard
      title={'Exposure'}
      value={`${avgExposures}s`}
      isLoading={isAvgExposuresLoading}
      isError={isAvgExposuresError || isRangeError}
      startValue={4}
      endValue={21}>
      <LineChart isLoading={isRangeLoading} data={chartData} color={'good'} />
    </ChartInfoCard>
  );
};
