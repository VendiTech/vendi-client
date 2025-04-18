import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { Box } from '@mui/material';
import { parseNumber } from '@/lib/helpers/parse-number';
import { colors } from '@/assets/styles/variables';

type Props = {
  data: number[];
  labels?: string[];
  color?: 'good' | 'bad' | 'neutral' | 'accent';
  showGradient?: boolean;
  animationDisabled?: boolean;
  isLoading?: boolean;
  withOpacity?: boolean;
  showScales?: boolean;
  tooltipEnabled?: boolean
};

const loadingMockData = [1, 0.8, 1.3, 1.1, 1.4, 2];

export const LineChart = (props: Props) => {
  const {
    data,
    labels,
    color,
    animationDisabled,
    isLoading,
    withOpacity,
    showScales,
    showGradient = true,
    tooltipEnabled = false,
  } = props;

  const displayData = isLoading ? loadingMockData : data;

  let lineColor = withOpacity ? colors.slate000 + '33' : colors.slate200;
  let backgroundColor = 'transparent';

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
        pointHoverRadius: tooltipEnabled ? 4 : 0,
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
          gradient.addColorStop(0, 'transparent');

          return gradient;
        },
      },
    ],
  };

  let maxYValue = Math.max(...displayData);
  if (maxYValue > 200000) {
    maxYValue = Math.round((maxYValue * 1.5) / 100000) * 100000;
  }

  return (
    <Box
      sx={{
        height: '100%',
        flexGrow: 1,
      }}>
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
              beginAtZero: true,
              display: !!showScales,
              min: showScales ? 0 : Math.min(...displayData) - maxYValue * 0.1,
              max: showScales ? undefined : maxYValue + maxYValue * 0.1,
              ticks: {
                maxTicksLimit: 8,
                callback: (label) => parseNumber(+label, true),
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: tooltipEnabled,
            },
          },
        }}
      />
    </Box>
  );
};
