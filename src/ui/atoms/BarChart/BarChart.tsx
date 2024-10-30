import { Bar } from 'react-chartjs-2';
import { BarElement, Tooltip, Chart, ChartData } from 'chart.js';
import { Box, SxProps, Theme } from '@mui/material';

Chart.register(BarElement, Tooltip);

type Props = {
  data: {
    label: string;
    value: number;
  }[];
  yLabelsCallback?: (labelValue: string | number) => string,
  sx?: SxProps<Theme>;
};

export const BarChart = (props: Props) => {
  const { data, yLabelsCallback, sx } = props;

  const chartData: ChartData<'bar'> = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: '',
        data: data.map((item) => item.value),
        backgroundColor: '#0EA5E9',
        barThickness: 32,
        borderRadius: 2,
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
          devicePixelRatio: 2,
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: '#64748b',
                font: {
                  size: 12,
                  lineHeight: '18px',
                },
              },
              border: {
                color: '#e2e8f0',
              },
            },
            y: {
              grid: {
                color: '#e2e8f0',
                drawTicks: false,
              },
              ticks: {
                color: '#64748b',
                font: {
                  size: 12,
                  lineHeight: '18px',
                },
                maxTicksLimit: 6,
                callback: yLabelsCallback,
              },
              border: {
                display: false,
                dash: [5, 4],
              },
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
