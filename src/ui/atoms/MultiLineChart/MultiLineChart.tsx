import { Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { verticalLinePlugin } from './helpers/vertical-line-plugin';
import { hoverGradientPlugin } from './helpers/hover-gradient';

type Data = {
  label: string;
  values: (number | null)[];
  color: string;
};

type Props = {
  data: Data[];
  displayByWeek?: boolean;
  xLabelsCallback?: (value: string | number) => string | undefined;
};

export const MultiLineChart = (props: Props) => {
  const { data, displayByWeek, xLabelsCallback } = props;

  const chartData: ChartData<'line'> = {
    labels: Array(data[0]?.values.length ?? 1)
      .fill(1)
      .map((item, i) => item + i),
    datasets: data.map((item) => ({
      label: item.label,
      data: item.values,
      borderColor: item.color,
      borderCapStyle: 'round',
      pointRadius: 0,
      backgroundColor: 'transparent',
      fill: true,
    })),
  };

  return (
    <Box
      sx={{
        height: '100%',
        flexGrow: 1,
      }}>
      <Line
        data={chartData}
        options={{
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
                title: (tooltipItems) => {
                  const month = tooltipItems[0].dataset.label;
                  const day = tooltipItems[0].label;

                  const firstDayAsDayOfWeekIndex = tooltipItems[0].dataset.data.findIndex((item) => item !== null);
                  
                  return month + ', ' + (+day - firstDayAsDayOfWeekIndex);
                },

                label: (tooltipItems) => String(tooltipItems.raw),
              },
            },
          },
        }}
        plugins={[verticalLinePlugin, hoverGradientPlugin]}
      />
    </Box>
  );
};
