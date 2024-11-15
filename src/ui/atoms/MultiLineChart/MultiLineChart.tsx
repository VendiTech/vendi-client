import { Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { verticalLinePlugin } from './helpers/vertical-line-plugin';
import { hoverGradientPlugin } from './helpers/hover-gradient';

type Data = {
  label: string;
  values: number[];
  color: string;
};

type Props = {
  data: Data[];
  xLabelsCallback: (value: string | number) => string | undefined;
};

export const MultiLineChart = (props: Props) => {
  const { data, xLabelsCallback } = props;

  const chartData: ChartData<'line'> = {
    labels: Array(data[0]?.values.length ?? 1)
      .fill(1)
      .map((item, i) => item + i),
    datasets: data.map((item) => ({
      label: item.label,
      data: item.values,
      borderColor: item.color,
      borderCapStyle: 'round',
      pointRadius: 0,
      backgroundColor: 'transparent',
      fill: true,
    })),
  };

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
          scales: {
            x: {
              ticks: {
                callback: xLabelsCallback,
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: (tooltipItems) =>
                  tooltipItems[0].dataset.label + ', ' + tooltipItems[0].label,
                label: (tooltipItems) => String(tooltipItems.raw),
              },
            },
          },
        }}
        plugins={[verticalLinePlugin, hoverGradientPlugin]}
      />
    </Box>
  );
};
