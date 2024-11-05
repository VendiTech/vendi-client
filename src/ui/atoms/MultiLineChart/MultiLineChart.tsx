import { Box, SxProps, Theme } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { colors } from '@/assets/styles/variables';
import { verticalLinePlugin } from './helpers/vertical-line-plugin';

type Data = {
  label: string;
  values: number[];
};

type Props = {
  data: Data[];
  xLabelsCallback: (value: number) => string;
  sx?: SxProps<Theme>;
};

const chartColors = [
  colors.sky500,
  colors.cyan400,
  colors.pink300,
  colors.peach500,
  colors.purple400,
  colors.yellow200,
  colors.green500,
  colors.red500,
  colors.purple500,
  colors.sky400,
  colors.slate500,
  colors.gradientStartBad,
];

export const MultiLineChart = (props: Props) => {
  const { data, xLabelsCallback, sx } = props;

  const chartData: ChartData<'line'> = {
    labels: Array(31)
      .fill(1)
      .map((item, i) => item + i),
    datasets: data.map((item, i) => ({
      label: item.label,
      data: item.values,
      borderColor: chartColors[i],
      pointRadius: 0,
      backgroundColor: colors.slate000,
    })),
  };

  return (
    <Box sx={sx}>
      <Line
        data={chartData}
        options={{
          interaction: {
            mode: 'nearest',
            intersect: false,
          },
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
                label: (tooltipItems) => tooltipItems.raw,
              },
            },
          },
        }}
        plugins={[verticalLinePlugin]}
      />
    </Box>
  );
};
