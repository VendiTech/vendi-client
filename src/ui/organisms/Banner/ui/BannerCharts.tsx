import { Box } from '@mui/material';
import { BannerChartWrapper } from './BannerChartWrapper';
import { BannerDoughnutChart } from './charts/BannerDoughnutChart';
import { BannerBarChart } from './charts/BannerBarChar';
import { BannerDivider } from './BannerDivider';
import { LineChart } from '@/ui/atoms/LineChart';

type Props = {
  isLoading: boolean;
};

const lineChartData = [1, 2.2, 1.3, 0.5, 0.7, 2];

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
        <LineChart
          withOpacity
          isLoading={isLoading}
          data={lineChartData}
          color={'neutral'}
          sx={{ width: 100, height: 56 }}
        />
      </BannerChartWrapper>

      <BannerDivider />

      <BannerChartWrapper
        isLoading={isLoading}
        title={'Avg. impressions'}
        subtitle={'105,490'}>
        <BannerDoughnutChart isLoading={isLoading} impressionsPercent={27} />
      </BannerChartWrapper>

      <BannerDivider />

      <BannerChartWrapper
        isLoading={isLoading}
        title={'Avg. screens activated'}
        subtitle={'52'}>
        <BannerBarChart isLoading={isLoading} />
      </BannerChartWrapper>
    </Box>
  );
};
