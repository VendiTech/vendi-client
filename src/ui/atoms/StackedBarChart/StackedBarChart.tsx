import { Bar } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { Box, SxProps, Theme } from '@mui/material';
import { colors } from '@/assets/styles/variables';

type Props = {
  data: number[][];
  sx?: SxProps<Theme>;
  variant?: 'good' | 'bad';
  isLoading?: boolean;
};

const loadingMockData = [20, 36, 64, 45, 36, 20, 31];

export const StackedBarChart = (props: Props) => {
  const { data, variant, isLoading, sx } = props;

  let barColor = colors.slate000;
  let backgroundColor = '#ffffff4d';

  if (variant) {
    backgroundColor = colors.slate100;
  }

  if (variant === 'good') {
    barColor = colors.green500;
  }

  if (variant === 'bad') {
    barColor = colors.red500;
  }

  const chartData: ChartData<'bar'> = {
    labels: Array(data.length).fill(''),
    datasets: [
      {
        label: '',
        data: !isLoading ? data.map((item) => item[0]) : [],
        backgroundColor: barColor,
        barThickness: 10,
        borderRadius: 3,
        borderSkipped: false,
      },
      {
        label: '',
        data: !isLoading ? data.map((item) => item[1]) : loadingMockData,
        backgroundColor: backgroundColor,
        barThickness: 10,
        borderRadius: 3,
        borderSkipped: false,
      },
    ],
  };

  return (
    <Box sx={sx}>
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          animation: isLoading ? false : undefined,
          devicePixelRatio: 2,
          responsive: true,
          scales: {
            x: {
              stacked: true,
              display: false,
            },
            y: {
              display: false,
              max: isLoading ? 64 : undefined,
            },
          },
          plugins: {
            tooltip: {
              enabled: false,
            },
          },
        }}
      />
    </Box>
  );
};
