import { Bar } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { Box } from '@mui/material';
import { colors } from '@/assets/styles/variables';
import { useRef } from 'react';

type Props = {
  data: number[][];
  variant?: 'good' | 'bad';
  isLoading?: boolean;
};

const loadingMockData = [20, 36, 64, 45, 36, 20, 31];

export const StackedBarChart = (props: Props) => {
  const { data, variant, isLoading } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  let barColor = colors.slate000;
  let backgroundColor = colors.slate000 + '4d';

  if (variant) {
    backgroundColor = colors.slate100;
  }

  if (variant === 'good') {
    barColor = colors.green500;
  }

  if (variant === 'bad') {
    barColor = colors.red500;
  }

  const chartData: ChartData<'bar'> = {
    labels: Array(data.length).fill(''),
    datasets: [
      {
        label: '',
        data: !isLoading ? data.map((item) => item[0]) : [],
        backgroundColor: barColor,
        hoverBackgroundColor: barColor,
        barThickness: 10,
        borderRadius: 3,
        borderSkipped: false,
      },
      {
        label: '',
        data: !isLoading ? data.map((item) => item[1]) : loadingMockData,
        backgroundColor: backgroundColor,
        hoverBackgroundColor: backgroundColor,
        barThickness: 10,
        borderRadius: 3,
        borderSkipped: false,
      },
    ],
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        position: 'relative',
        height: '100%',
        flexGrow: 1,
        overflowX: 'auto',
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}>
      <Box
        sx={{
          flexGrow: 1,
          minWidth: Math.max(
            data.length * 14,
            containerRef.current?.clientWidth ?? 0,
          ),
        }}>
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            animation: isLoading ? false : undefined,
            responsive: true,
            scales: {
              x: {
                stacked: true,
                display: false,
              },
              y: {
                display: false,
                max: isLoading ? 64 : undefined,
              },
            },
            plugins: {
              tooltip: {
                enabled: false,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};
