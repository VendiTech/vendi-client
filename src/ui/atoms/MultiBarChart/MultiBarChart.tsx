import { Bar } from 'react-chartjs-2';
import {
  BarElement,
  CategoryScale,
  Chart,
  ChartData,
  LinearScale,
} from 'chart.js';
import { Box, SxProps, Theme } from '@mui/material';
import { chartTooltipConfig, getChartScalesConfig } from '@/lib/charts';
import { colors } from '@/assets/styles/variables';

Chart.register(BarElement, CategoryScale, LinearScale);

type Data = {
  values: number[];
  label: string;
};

type Props = {
  data: Data[];
  sx?: SxProps<Theme>;
};

const splitToDatasets = (data: Data[]) => {
  const result: number[][] = [];

  data.forEach((item) => {
    item.values.forEach((value, i) => {
      if (!result[i]) {
        result[i] = [];
      }
      result[i].push(value);
    });
  });

  return result;
};

export const MultiBarChart = (props: Props) => {
  const { data, sx } = props;

  const splitValues = splitToDatasets(data);
  const chartColors = [colors.sky500, colors.cyan400, colors.pink300];

  const chartData: ChartData<'bar'> = {
    labels: data.map((item) => item.label),
    datasets: splitValues.map((item, i) => ({
      label: data[i].label,
      data: item,
      barThickness: 8,
      borderRadius: 2,
      borderSkipped: false,
      backgroundColor: chartColors[i],
    })),
  };

  console.log(splitValues);

  return (
    <Box sx={sx}>
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          devicePixelRatio: 2,
          scales: getChartScalesConfig({}),
          plugins: {
            legend: {
              display: true,
              labels: {
                color: colors.slate500,
              },
            },
            tooltip: chartTooltipConfig,
          },
        }}
      />
    </Box>
  );
};
