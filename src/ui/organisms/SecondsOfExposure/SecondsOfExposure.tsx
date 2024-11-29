import { LineChart } from '@/ui/atoms/LineChart';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { useGetAvgExposure } from '@/lib/api';

const data = [5, 2, 4, 3.3, 5];

export const SecondsOfExposure = () => {
  const {
    data: exposure,
    isLoading: isExposureLoading,
    isError: isExposureError,
  } = useGetAvgExposure();

  const avgExposure = exposure?.data.seconds_exposure ?? 0;

  return (
    <ChartInfoCard
      title={'Seconds of Exposure'}
      subtitle={'per min'}
      value={`${avgExposure}s`}
      startValue={4}
      endValue={21}
      isLoading={isExposureLoading}
      isError={isExposureError || !avgExposure}
    >
      <LineChart isLoading={false} data={data} color={'good'} />
    </ChartInfoCard>
  );
};
