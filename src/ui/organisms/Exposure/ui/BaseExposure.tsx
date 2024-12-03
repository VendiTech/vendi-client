import { useGetAvgExposure, useGetExposurePerRange } from '@/lib/api';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { LineChart } from '@/ui/atoms/LineChart';

type Props = {
  title: string
  subtitle?: string
}

export const BaseExposure = ({title, subtitle}: Props) => {
  const {
    data: avgExposure,
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
      title={title}
      subtitle={subtitle}
      value={`${avgExposure?.data.seconds_exposure}s`}
      isLoading={isAvgExposuresLoading}
      isError={isAvgExposuresError || isRangeError}
      startValue={4}
      endValue={21}>
      <LineChart isLoading={isRangeLoading} data={chartData} color={'good'} />
    </ChartInfoCard>
  );
};
