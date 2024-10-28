import { PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import { ArcElement, Chart, ChartData, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { lineBackgroundPlugin } from '../heplers/line-background-plugin';

Chart.register(ArcElement, Tooltip, Legend);

type Props = {
  data: number[];
  total?: number;
} & PropsWithChildren;

const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F1F5F9'];

export const DoughnutChart = (props: Props) => {
  const { data, total, children } = props;

  const newData = [...data];
  const dataSum = newData.reduce((acc, curr) => acc + curr, 0);

  if (total && total > dataSum) {
    newData.push(dataSum - total);
  }

  const chartData: ChartData<'doughnut'> = {
    datasets: [
      {
        data: newData,
        borderRadius: 10,
        borderWidth: 0,
        backgroundColor: colors,
        hoverBackgroundColor: colors
      },
    ],
  };

  return (
    <Box sx={{ width: 200, height: 200, position: 'relative' }}>
      <Doughnut
        data={chartData}
        options={{
          devicePixelRatio: 2,
          cutout: '90%',
          spacing: 6,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
        }}
        plugins={[lineBackgroundPlugin]}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          bottom: '20%',
          left: '20%',
          right: '20%',
          display: 'flex',
          alignItems: 'center',
        }}>
        {children}
      </Box>
    </Box>
  );
};
