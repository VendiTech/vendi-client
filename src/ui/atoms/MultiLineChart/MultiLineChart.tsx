import { Box, SxProps, Theme } from '@mui/material';
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
  sx?: SxProps<Theme>;
};

export const MultiLineChart = (props: Props) => {
  const { data, xLabelsCallback, sx } = props;

  const chartData: ChartData<'line'> = {
    labels: Array(31)
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
    <Box sx={sx}>
      <Line
        data={chartData}
        options={{
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
