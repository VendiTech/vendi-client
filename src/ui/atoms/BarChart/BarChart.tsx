import { Bar } from 'react-chartjs-2';
import { BarElement, Chart, ChartData } from 'chart.js';
import { Box, SxProps, Theme } from '@mui/material';

Chart.register(BarElement);

type Props = {
  data: {
    label: string;
    value: number;
  }[];
  sx?: SxProps<Theme>;
};

export const BarChart = (props: Props) => {
  const { data, sx } = props;

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
              border: {
                display: false,
              },
            },
            y: {
              ticks: {
                maxTicksLimit: 6,
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
