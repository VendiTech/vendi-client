import { PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import { ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { chartColors, colors } from '@/assets/styles/variables';
import { lineBackgroundPlugin } from '../heplers/line-background-plugin';
import { repeatColors } from '../heplers/repeat-colors';
import { adjustDataMinSize } from '../heplers/adjust-data-min-size';

type Props = {
  data: number[];
  labels?: string[];
  colors?: string[];
  total?: number;
  backgroundColor?: string;
  isLoading?: boolean;
  tooltipDisabled?: boolean;
} & PropsWithChildren;

export const DoughnutChart = (props: Props) => {
  const {
    data,
    labels,
    colors: propsColors,
    total,
    children,
    isLoading,
    backgroundColor = colors.slate100,
    tooltipDisabled,
  } = props;

  const newData = isLoading ? [] : [...data];
  const adjustedData = adjustDataMinSize(newData);
  const dataSum = adjustedData.reduce((acc, curr) => acc + curr, 0);

  const isNotFulfilled = total && total > dataSum;

  if (isNotFulfilled && !isLoading) {
    adjustedData.push(dataSum - total);
  }

  const newColors = isLoading
    ? [colors.slate000 + '4d']
    : (propsColors ?? chartColors);

  const repeatedColors = repeatColors(newColors, data.length);

  if (isNotFulfilled) {
    repeatedColors.push('transparent');
  }

  const chartData: ChartData<'doughnut'> = {
    datasets: [
      {
        data: adjustedData,
        borderRadius: 99,
        borderWidth: 0,
        backgroundColor: repeatedColors,
        hoverBackgroundColor: repeatedColors,
      },
    ],
    labels: labels,
  };

  return (
    <Box sx={{ height: '100%', flexGrow: 1, position: 'relative', zIndex: 1 }}>
      <Doughnut
        data={chartData}
        options={{
          animation: isLoading ? false : undefined,
          cutout: '90%',
          spacing: 3,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: !tooltipDisabled,
              filter: (tooltipItem) => {
                return (
                  tooltipItem.dataIndex !== repeatedColors.length - 1 ||
                  !isNotFulfilled
                );
              },
              callbacks: {
                label: (tooltipItem) => String(newData[tooltipItem.dataIndex])
              },
            },
          },
        }}
        plugins={[lineBackgroundPlugin(backgroundColor)]}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          bottom: '20%',
          left: '20%',
          right: '20%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          zIndex: -1,
        }}>
        {children}
      </Box>
    </Box>
  );
};
