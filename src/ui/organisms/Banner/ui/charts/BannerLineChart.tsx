import { LineChart } from '@/ui/atoms/LineChart';

type Props = {
  isLoading: boolean;
};

const loadingData = [1, 0.8, 1.3, 1.1, 1.4, 2];

const chartData = [1, 2.2, 1.3, 0.5, 0.7, 2];

export const BannerLineChart = ({ isLoading }: Props) => {
  return (
    <LineChart
      data={isLoading ? loadingData : chartData}
      animationDisabled={isLoading}
      showGradient={!isLoading}
      color={isLoading ? undefined : 'neutral'}
      sx={{ width: 100, height: 56 }}
    />
  );
};
