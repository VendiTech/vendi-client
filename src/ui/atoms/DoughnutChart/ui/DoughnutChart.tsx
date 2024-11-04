import { PropsWithChildren } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { colors } from '@/assets/styles/variables';
import { lineBackgroundPlugin } from '../heplers/line-background-plugin';
import { repeatColors } from '../heplers/repeat-colors';

type Props = {
  data: number[];
  colors?: string[];
  total?: number;
  backgroundColor?: string;
  isLoading?: boolean;
  sx?: SxProps<Theme>;
} & PropsWithChildren;

export const DoughnutChart = (props: Props) => {
  const {
    data,
    colors: propsColors,
    total,
    children,
    isLoading,
    backgroundColor = colors.slate100,
    sx,
  } = props;

  const newData = isLoading ? [] : [...data];
  const dataSum = newData.reduce((acc, curr) => acc + curr, 0);

  const isNotFulfilled = total && total > dataSum;

  if (isNotFulfilled && !isLoading) {
    newData.push(dataSum - total);
  }

  const newColors = isLoading
    ? [colors.slate000 + '4d']
    : (propsColors ?? [colors.sky500, colors.cyan400, colors.pink300]);

  const repeatedColors = repeatColors(newColors, data.length);

  if (isNotFulfilled) {
    repeatedColors.push('#00000000');
  }

  const chartData: ChartData<'doughnut'> = {
    datasets: [
      {
        data: newData,
        borderRadius: 99,
        borderWidth: 0,
        backgroundColor: repeatedColors,
        hoverBackgroundColor: repeatedColors,
      },
    ],
  };

  return (
    <Box sx={{ ...sx, position: 'relative' }}>
      <Doughnut
        data={chartData}
        options={{
          animation: isLoading ? false : undefined,
          devicePixelRatio: 2,
          cutout: '90%',
          spacing: 3,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
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
          gap: '10px'
        }}>
        {children}
      </Box>
    </Box>
  );
};
