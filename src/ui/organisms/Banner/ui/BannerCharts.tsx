import { Box, Divider } from '@mui/material';
import { BannerDivider } from './BannerDivider';
import { BannerChartWrapper } from './BannerChartWrapper';
import { BannerLineChart } from '@/ui/organisms/Banner/ui/charts/BannerLineChart';
import { BannerDoughnutChart } from '@/ui/organisms/Banner/ui/charts/BannerDoughnutChart';
import { BannerBarChart } from '@/ui/organisms/Banner/ui/charts/BannerBarChar';

type Props = {
  isLoading: boolean;
};

export const BannerCharts = ({ isLoading }: Props) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { desktop: '1fr auto 1fr auto 1fr' },
        gap: 4
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
