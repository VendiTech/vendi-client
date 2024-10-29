import { PropsWithChildren, useLayoutEffect, useState } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { ArcElement, Chart, ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { lineBackgroundPlugin } from '../heplers/line-background-plugin';
import { repeatColors } from '../heplers/repeat-colors';

Chart.register(ArcElement);

type Props = {
  data: number[];
  colors?: string[];
  total?: number;
  backgroundColor?: string;
  sx?: SxProps<Theme>
} & PropsWithChildren;

const getCssVar = (name: string) =>
  getComputedStyle(document.body).getPropertyValue(name);

export const DoughnutChart = (props: Props) => {
  const {
    data,
    colors: propsColors,
    total,
    children,
    backgroundColor = '#f1f5f9',
    sx,
  } = props;

  const [colors, setColors] = useState(
    propsColors ?? Array(4).fill(backgroundColor),
  );

  const newData = [...data];
  const dataSum = newData.reduce((acc, curr) => acc + curr, 0);

  const isNotFulfilled = total && total > dataSum;

  if (isNotFulfilled) {
    newData.push(dataSum - total);
  }

  useLayoutEffect(() => {
    const newColors = propsColors ?? [
      getCssVar('--sky-500'),
      getCssVar('--cyan-400'),
      getCssVar('--pink-300'),
    ];

    const repeatedColors = repeatColors(newColors, data.length);

    if (isNotFulfilled) {
      repeatedColors.push('#00000000');
    }

    setColors(repeatedColors);
  }, [backgroundColor, data.length, isNotFulfilled, propsColors]);

  const chartData: ChartData<'doughnut'> = {
    datasets: [
      {
        data: newData,
        borderRadius: 99,
        borderWidth: 0,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };

  return (
    <Box sx={{ ...sx, position: 'relative' }}>
      <Doughnut
        data={chartData}
        options={{
          devicePixelRatio: 2,
          cutout: '90%',
          spacing: 6,
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
        }}>
        {children}
      </Box>
    </Box>
  );
};
