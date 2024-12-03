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

  const currentExposure = avgExposure?.data.seconds_exposure ?? 0 
  // TODO get value from api
  const previousExposure = currentExposure - 1000
  
  return (
    <ChartInfoCard
      title={title}
      subtitle={subtitle}
      displayValue={`${currentExposure}s`}
      isLoading={isAvgExposuresLoading}
      isError={isAvgExposuresError || isRangeError}
      previousValue={previousExposure}
      currentValue={currentExposure}>
      <LineChart isLoading={isRangeLoading} data={chartData} color={'good'} />
    </ChartInfoCard>
  );
};
