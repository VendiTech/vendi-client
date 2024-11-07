import { Box } from '@mui/material';
import { LineChart } from '@/ui/atoms/LineChart';
import { StackedBarChart } from '@/ui/atoms/StackedBarChart';
import { LoadingText } from '@/ui/atoms/LoadingText';
import { DoughnutChart } from '@/ui/atoms/DoughnutChart';
import { BannerChartWrapper } from './BannerChartWrapper';
import { BannerDivider } from './BannerDivider';
import { colors } from '@/assets/styles/variables';

type Props = {
  isLoading: boolean;
};

const lineChartData = [1, 2.2, 1.3, 0.5, 0.7, 2];

const barsData = [
  [2, 4],
  [1, 5],
  [2, 4],
  [0.8, 3.3],
  [2, 4],
  [3, 4.2],
];

export const BannerCharts = ({ isLoading }: Props) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          desktop:
            'minmax(auto, 288px) auto minmax(auto, 288px) auto minmax(auto, 288px)',
        },
        justifyItems: 'center',
        gap: 2,
      }}>
      <BannerChartWrapper
        isLoading={isLoading}
        title={'Units sold'}
        subtitle={'10,423'}>
        <Box sx={{ width: 100, height: 64 }}>
          <LineChart
            withOpacity
            isLoading={isLoading}
            data={lineChartData}
            color={'neutral'}
          />
        </Box>
      </BannerChartWrapper>

      <BannerDivider />

      <BannerChartWrapper
        isLoading={isLoading}
        title={'Avg. impressions'}
        subtitle={'105,490'}>
        <Box sx={{ width: 64, height: 64 }}>
          <DoughnutChart
            data={[27]}
            isLoading={isLoading}
            tooltipDisabled
            total={100}
            backgroundColor={colors.slate000 + '4d'}
            colors={[colors.slate000]}>
            <LoadingText
              withOpacity
              isLoading={isLoading}
              variant={'sm-semibold'}
              sx={{ fontWeight: 700 }}>
              27%
            </LoadingText>
          </DoughnutChart>
        </Box>
      </BannerChartWrapper>

      <BannerDivider />

      <BannerChartWrapper
        isLoading={isLoading}
        title={'Avg. screens activated'}
        subtitle={'52'}>
        <Box sx={{ width: 100, height: 64 }}>
          <StackedBarChart data={barsData} isLoading={isLoading} />
        </Box>
      </BannerChartWrapper>
    </Box>
  );
};
