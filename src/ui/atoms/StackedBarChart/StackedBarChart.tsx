import React, { useLayoutEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, ChartData } from 'chart.js';
import { Box, SxProps, Theme } from '@mui/material';

Chart.register(BarElement);

type Props = {
  data: number[][];
  sx?: SxProps<Theme>;
  variant?: 'good' | 'bad';
  animationDisabled?: boolean
};

const getCssVar = (name: string) =>
  getComputedStyle(document.body).getPropertyValue(name);

export const StackedBarChart = (props: Props) => {
  const { data, variant, animationDisabled, sx } = props;

  const [barColor, setBarColor] = useState('#ffffff');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff4d');
  
  useLayoutEffect(() => {
    if (variant) {
      setBackgroundColor(getCssVar('--slate-100'));
    }
    
    if (variant === 'good') {
      setBarColor(getCssVar('--green-500'));
    }
    
    if (variant === 'bad') {
      setBarColor(getCssVar('--red-500'));
    }
  }, [variant])
  
  const chartData: ChartData<'bar'> = {
    labels: Array(data.length).fill(''),
    datasets: [
      {
        label: '',
        data: !animationDisabled ? data.map((item) => item[0]) : [],
        backgroundColor: barColor,
        barThickness: 10,
        borderRadius: 3,
      },
      {
        label: '',
        data: data.map((item) => item[1]),
        backgroundColor: backgroundColor,
        barThickness: 10,
        borderRadius: 3,
      },
    ],
  };

  return (
    <Box sx={sx}>
      <Bar
        data={chartData}
        options={{
          animation: animationDisabled ? false : undefined,
          devicePixelRatio: 2,
          responsive: true,
          scales: {
            x: {
              stacked: true,
              display: false,
            },
            y: {
              display: false,
            },
          },
        }}
      />
    </Box>
  );
};

export default StackedBarChart;
