import { useRef } from 'react';
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
  const { data, categories, isLoading } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  const displayData = isLoading ? loadingMockData : data;

  const splitValues = splitToDatasets(displayData);
  const newColors = isLoading
    ? Array(chartColors.length).fill(colors.slate050)
    : categories.map((item) => item.color);

  const chartData: ChartData<'bar'> = {
    labels: data.map((item) => item.label),
    datasets: splitValues.map((item, i) => ({
      label: '',
      data: item,
      barThickness: 10,
      categoryPercentage: 1.5,
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
        flexGrow: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        position: 'relative',
      }}>
      <Box
        ref={containerRef}
        sx={{ display: 'flex', flexGrow: 1, overflowX: 'auto' }}>
        <Box
          sx={{
            flexGrow: 1,
            minWidth: Math.max(
              data.length * categories.length * 15,
              containerRef.current?.clientWidth ?? 0,
            ),
          }}>
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
                      `${categories[tooltipItems[0].datasetIndex].title} sales`,
                  },
                },
              },
            }}
          />
        </Box>
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
        <ChartLegend legend={categories} />
      )}
    </Box>
  );
};
