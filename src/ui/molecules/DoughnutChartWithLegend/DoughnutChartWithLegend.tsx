import { Box, Typography } from '@mui/material';
import { colors } from '@/assets/styles/variables';
import { DoughnutChart } from '@/ui/atoms/DoughnutChart';
import { LoadingText } from '@/ui/atoms/LoadingText';
import { GrowthPercent } from '@/ui/atoms/GrowthPercent';

type Props = {
  data: {
    title: string;
    value: number;
    hideAtChart?: boolean;
  }[];
  growthPercent: number;
  showAbsoluteValues?: boolean;
};

export const DoughnutChartWithLegend = (props: Props) => {
  const { data, growthPercent, showAbsoluteValues } = props;

  const totalCount = data.reduce((acc, curr) => acc + curr.value, 0);
  const chartData = data
    .filter((item) => !item.hideAtChart)
    .map((item) => item.value);

  const chartColors = [colors.sky500, colors.cyan400, colors.pink300];

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 3,
        flexWrap: 'wrap',
      }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
        <DoughnutChart
          total={totalCount}
          data={chartData}
          colors={chartColors}
          sx={{ width: 160, height: 160 }}>
          <LoadingText
            isLoading={false}
            variant={'3xl-medium'}
            color={'var(--slate-900)'}>
            {totalCount}
          </LoadingText>

          <GrowthPercent percent={growthPercent} />
        </DoughnutChart>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          flexGrow: 1,
        }}>
        {data.map((item, i) => (
          <Box
            key={item.title}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              color: 'var(--slate-500)',
            }}>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <Box
                sx={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '3px',
                  backgroundColor: item.hideAtChart
                    ? 'var(--slate-100)'
                    : chartColors[i],
                  border: item.hideAtChart
                    ? '1px solid var(--slate-200)'
                    : 'none',
                }}
              />

              <Typography variant={'sm-regular'}>{item.title}</Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {showAbsoluteValues ? (
                <Typography variant={'sm-regular'}>{item.value}</Typography>
              ) : null}

              <Typography variant={'sm-regular'}>
                {Math.round((item.value / totalCount) * 1000) / 10}%
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
