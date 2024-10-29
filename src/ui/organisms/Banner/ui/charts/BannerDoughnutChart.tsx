import { DoughnutChart } from '@/ui/atoms/DoughnutChart';
import { LoadingText } from '@/ui/atoms/LoadingText';

type Props = {
  isLoading: boolean;
  impressionsPercent: number;
};

export const BannerDoughnutChart = ({
  isLoading,
  impressionsPercent,
}: Props) => {
  return (
    <DoughnutChart
      data={isLoading ? [] : [impressionsPercent]}
      animationDisabled={isLoading}
      total={100}
      backgroundColor={'#ffffff4d'}
      colors={isLoading ? ['#ffffff4d'] : ['#ffffff']}
      sx={{ width: 64, height: 64 }}>
      <LoadingText
        isLoading={isLoading}
        variant={'sm-semibold'}
        sx={{ fontWeight: 700 }}>
        {impressionsPercent}%
      </LoadingText>
    </DoughnutChart>
  );
};
