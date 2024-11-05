import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { Box, SxProps, Theme } from '@mui/material';
import { colors } from '@/assets/styles/variables';

type Props = {
  data: number[];
  labels?: string[];
  color?: 'good' | 'bad' | 'neutral' | 'accent';
  showGradient?: boolean;
  sx?: SxProps<Theme>;
  animationDisabled?: boolean;
  isLoading?: boolean;
  withOpacity?: boolean;
  showScales?: boolean;
};

const loadingMockData = [1, 0.8, 1.3, 1.1, 1.4, 2];

export const LineChart = (props: Props) => {
  const {
    data,
    labels,
    color,
    sx,
    animationDisabled,
    isLoading,
    withOpacity,
    showScales,
    showGradient = true,
  } = props;

  const displayData = isLoading ? loadingMockData : data;

  let lineColor = withOpacity ? '#ffffff33' : colors.slate200;
  let backgroundColor = '#00000000';

  if (color === 'accent') {
    lineColor = colors.sky400;
  }
  
  if (color === 'good' && !isLoading) {
    lineColor = colors.green500;
    backgroundColor = colors.gradientStartGood;
  }

  if (color === 'bad' && !isLoading) {
    lineColor = colors.red500;
    backgroundColor = colors.gradientStartBad;
  }

  if (color === 'neutral' && !isLoading) {
    lineColor = colors.slate000;
    backgroundColor = colors.gradientStartNeutral;
  }

  const chartData: ChartData<'line'> = {
    labels: labels ?? Array(displayData.length).fill(''),
    datasets: [
      {
        data: displayData,
        borderColor: lineColor,
        borderWidth: 2,
        borderCapStyle: 'round',
        pointRadius: 0,
        fill: !isLoading && showGradient,
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;

          if (!chartArea) return;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top,
          );
          gradient.addColorStop(1, backgroundColor);
          gradient.addColorStop(0, '#00000000');

          return gradient;
        },
      },
    ],
  };

  return (
    <Box sx={sx}>
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false,
          animation: isLoading || animationDisabled ? false : undefined,
          scales: {
            x: {
              display: !!showScales,
            },
            y: {
              display: !!showScales,
              min: showScales ? 0 : Math.min(...displayData) - 0.2,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </Box>
  );
};
