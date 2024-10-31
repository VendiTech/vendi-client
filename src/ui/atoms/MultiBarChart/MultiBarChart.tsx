import { Bar } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { Box, SxProps, Theme } from '@mui/material';
import { colors } from '@/assets/styles/variables';
import { ChartLegend } from '@/ui/atoms/ChartLegend';

type Data = {
  values: number[];
  label: string;
};

type Props = {
  categories: string[];
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
  const { data, categories, sx } = props;

  const splitValues = splitToDatasets(data);
  const chartColors = [colors.sky500, colors.cyan400, colors.pink300];

  const legend = categories.map((item, i) => ({
    title: item,
    color: chartColors[i],
  }));

  const chartData: ChartData<'bar'> = {
    labels: data.map((item) => item.label),
    datasets: splitValues.map((item, i) => ({
      label: '',
      data: item,
      barThickness: 10,
      borderRadius: 2,
      borderWidth: {
        left: 1,
        right: 1,
      },
      borderColor: 'transparent',
      borderSkipped: false,
      backgroundColor: chartColors[i],
    })),
  };

  return (
    <Box sx={{ ...sx, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            devicePixelRatio: 2,
            plugins: {
              legend: {
                display: true,
                labels: {
                  color: colors.slate500,
                },
              },
              tooltip: {
                callbacks: {
                  footer: (tooltipItems) =>
                    `${categories[tooltipItems[0].datasetIndex]} sales`,
                },
              },
            },
          }}
        />
      </Box>

      <ChartLegend legend={legend} />
    </Box>
  );
};
