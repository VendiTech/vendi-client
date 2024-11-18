import { Line } from 'react-chartjs-2';
import { ChartData, TooltipItem } from 'chart.js';
import { Box } from '@mui/material';
import { verticalLinePlugin } from './helpers/vertical-line-plugin';
import { hoverGradientPlugin } from './helpers/hover-gradient';

type Data = {
  label: string;
  values: (number | null)[];
  color: string;
};

type Props = {
  data: Data[];
  xLabelsCallback?: (value: string | number) => string | undefined;
  tooltipFooterCallback?: (
    tooltipItem: TooltipItem<'line'>[],
  ) => string | undefined;
  tooltipTitleCallback?: (
    tooltipItem: TooltipItem<'line'>[],
  ) => string | undefined;
};

export const MultiLineChart = (props: Props) => {
  const { data, xLabelsCallback, tooltipTitleCallback, tooltipFooterCallback } =
    props;

  const chartData: ChartData<'line'> = {
    labels: Array(Math.max(...data.map((item) => item.values.length), 0))
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
                title: tooltipTitleCallback,
                label: (context) => {
                  const dataPoints = context.chart.tooltip?.dataPoints;

                  if (!dataPoints?.length) {
                    return '';
                  }

                  if (
                    dataPoints.length === 1 ||
                    dataPoints[0].datasetIndex === context.datasetIndex
                  ) {
                    return dataPoints[0].formattedValue;
                  }

                  return '';
                },
                footer: tooltipFooterCallback,
              },
            },
          },
        }}
        plugins={[verticalLinePlugin, hoverGradientPlugin]}
      />
    </Box>
  );
};
