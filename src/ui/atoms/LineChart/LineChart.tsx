import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { Box, SxProps, Theme } from '@mui/material';

type Props = {
  data: number[];
  color?: 'good' | 'bad' | 'neutral';
  showGradient?: boolean;
  sx?: SxProps<Theme>;
  animationDisabled?: boolean;
};

const getCssVar = (name: string) =>
  getComputedStyle(document.body).getPropertyValue(name);

export const LineChart = (props: Props) => {
  const { data, color, sx, animationDisabled, showGradient = true } = props;

  const [lineColor, setLineColor] = useState('#ffffff33');
  const [backgroundColor, setBackgroundColor] = useState('#00000000');

  useEffect(() => {
    if (color === 'good') {
      setLineColor(getCssVar('--green-500'));
      setBackgroundColor(getCssVar('--gradient-start-good'));
    }

    if (color === 'bad') {
      setLineColor(getCssVar('--red-500'));
      setBackgroundColor(getCssVar('--gradient-start-bad'));
    }

    if (color === 'neutral') {
      setLineColor(getCssVar('--slate-000'));
      setBackgroundColor(getCssVar('--gradient-start-neutral'));
    }
  }, [color]);

  const chartData: ChartData<'line'> = {
    labels: Array(data.length).fill(''),
    datasets: [
      {
        data,
        borderColor: lineColor,
        borderWidth: 2,
        borderCapStyle: 'round',
        pointRadius: 0,
        fill: showGradient,
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
          animation: animationDisabled ? false : undefined,
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
              min: Math.min(...data) - 0.2,
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
