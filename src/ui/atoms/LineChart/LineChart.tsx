import { Line } from 'react-chartjs-2';
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartData,
  Filler,
} from 'chart.js';
import { Box } from '@mui/material';
import getComputedStyle from '@popperjs/core/lib/dom-utils/getComputedStyle';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

type Props = {
  data: number[];
  color: 'good' | 'bad';
};

const getCssVar = (name: string) =>
  getComputedStyle(document.body).getPropertyValue(name);

export const LineChart = (props: Props) => {
  const { data, color } = props;

  let lineColor = getCssVar('--green-500');
  let backgroundColor = getCssVar('--gradient-start-good');
  
  if (color === 'bad') {
    lineColor = getCssVar('--red-500');
    backgroundColor = getCssVar('--gradient-start-bad');
  }
  
  const chartData: ChartData<'line'> = {
    labels: Array(data.length).fill(''),
    datasets: [
      {
        data,
        borderColor: lineColor,
        borderWidth: 2,
        borderCapStyle: 'round',
        pointRadius: 0,
        fill: true,
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;

          if (!chartArea || !backgroundColor) return;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top,
          );
          gradient.addColorStop(0.26, backgroundColor);
          gradient.addColorStop(0, '#00000000');

          return gradient;
        },
      },
    ],
  };

  return (
    <Box sx={{ height: '100%' }}>
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
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
