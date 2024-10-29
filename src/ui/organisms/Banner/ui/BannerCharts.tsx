import { Box } from '@mui/material';
import { BannerChartWrapper } from './BannerChartWrapper';
import { BannerLineChart } from './charts/BannerLineChart';
import { BannerDoughnutChart } from './charts/BannerDoughnutChart';
import { BannerBarChart } from './charts/BannerBarChar';
import { BannerDivider } from './BannerDivider';

type Props = {
  isLoading: boolean;
};

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
        <BannerLineChart isLoading={isLoading} />
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
