import { StackedBarChart } from '@/ui/atoms/StackedBarChart';

type Props = {
  isLoading: boolean;
};

const barsData = [
  [2, 4],
  [1, 5],
  [2, 4],
  [0.8, 3.3],
  [2, 4],
  [3, 4.2],
];

export const BannerBarChart = ({ isLoading }: Props) => {
  return (
    <StackedBarChart
      data={barsData}
      animationDisabled={isLoading}
      sx={{ width: 100, height: 66 }}
    />
  );
};
