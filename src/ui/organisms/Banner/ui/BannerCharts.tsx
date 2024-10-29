import { Box, Divider, Typography } from '@mui/material';
import { LineChart } from '@/ui/atoms/LineChart';
import { DoughnutChart } from '@/ui/atoms/DoughnutChart';
import { StackedBarChart } from '@/ui/atoms/StackedBarChart';
import { BannerDivider } from './BannerDivider';
import { BannerChartWrapper } from './BannerChartWrapper';

const chartData = [1, 0.8, 1.3, 1.1, 1.4, 2];
const barsData = [
  [2, 4],
  [1, 5],
  [2, 4],
  [0.8, 3.3],
  [2, 4],
  [3, 4.2],
];

export const BannerCharts = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr auto 1fr',
        gap: 4,
      }}>
      <BannerChartWrapper title={'Units sold'} subtitle={'10,423'}>
        <LineChart data={chartData} sx={{ width: 100, maxHeight: 66 }} />
      </BannerChartWrapper>

      <BannerDivider />
      
      <BannerChartWrapper title={'Avg. impressions'} subtitle={'105,490'}>
        <DoughnutChart
          data={[27]}
          total={100}
          backgroundColor={'#ffffff4d'}
          colors={['#ffffff']}
          sx={{ width: 64, height: 64 }}>
          <Typography
            variant={'sm-semibold'}
            sx={{ fontWeight: 700, m: '0 auto' }}>
            27%
          </Typography>
        </DoughnutChart>
      </BannerChartWrapper>

      <Divider
        orientation={'vertical'}
        variant={'middle'}
        flexItem
        sx={{
          maxHeight: 66,
          borderStyle: 'dashed',
          borderColor: 'inherit',
        }}
      />

      <BannerChartWrapper title={'Avg. screens activated'} subtitle={'52'}>
        <StackedBarChart data={barsData} sx={{ width: 100, maxHeight: 66 }} />
      </BannerChartWrapper>
    </Box>
  );
};
