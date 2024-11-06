import { Bar } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { Box } from '@mui/material';
import { chartColors, colors } from '@/assets/styles/variables';
import { ChartLegend } from '@/ui/atoms/ChartLegend';
import { NoData } from '@/ui/atoms/NoData';
import { splitToDatasets } from '../helpers/split-to-datasets';
import { loadingMockData } from '../helpers/loading-mock-data';
import { MultiBarChartProps } from '../types';

export const MultiBarChart = (props: MultiBarChartProps) => {
  const { data, categories, isLoading, sx } = props;

  const displayData = isLoading ? loadingMockData : data;

  const splitValues = splitToDatasets(displayData);
  const newColors = isLoading
    ? Array(chartColors.length).fill(colors.slate050)
    : chartColors;

  const legend = categories.map((item, i) => ({
    title: item,
    color: newColors[i],
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
      backgroundColor: newColors[i],
      hoverBackgroundColor: isLoading ? colors.slate050 : undefined,
    })),
  };

  return (
    <Box
      sx={{
        ...sx,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        position: 'relative',
      }}>
      <Box sx={{ flexGrow: 1 }}>
        <Bar
          data={chartData}
          options={{
            animation: isLoading ? false : undefined,
            maintainAspectRatio: false,
            scales: {
              y: {
                ticks: {
                  display: !isLoading,
                },
              },
              x: {
                ticks: {
                  display: !isLoading,
                },
                border: {
                  display: !isLoading,
                },
              },
            },
            plugins: {
              tooltip: {
                enabled: !isLoading,
                callbacks: {
                  footer: (tooltipItems) =>
                    `${categories[tooltipItems[0].datasetIndex]} sales`,
                },
              },
            },
          }}
        />
      </Box>

      {isLoading ? (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
          }}>
          <NoData />
        </Box>
      ) : (
        <ChartLegend legend={legend} />
      )}
    </Box>
  );
};
