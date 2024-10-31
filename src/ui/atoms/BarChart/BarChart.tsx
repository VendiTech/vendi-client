import { Chart } from 'react-chartjs-2';
import { BarElement, ChartData, ChartDataset } from 'chart.js';
import { Box, SxProps, Theme } from '@mui/material';
import { colors } from '@/assets/styles/variables';

type Data = {
  label: string;
  value: number;
};

type BaseProps = {
  yLabelsCallback?: (labelValue: string | number) => string;
  sx?: SxProps<Theme>;
};

type PropsWithLine = {
  data: (Data & { lineValue: number })[];
  withLine?: true;
};

type PropsWithoutLine = {
  data: Data[];
  withLine?: false;
};

export const BarChart = (
  props: (PropsWithLine | PropsWithoutLine) & BaseProps,
) => {
  const { data, yLabelsCallback, withLine, sx } = props;

  const datasets: ChartDataset<'bar' | 'line'>[] = [
    {
      type: 'bar',
      label: '',
      data: data.map((item) => item.value),
      backgroundColor: colors.sky500,
      hoverBackgroundColor: (context) => {
        const chart = context.chart;
        const { ctx } = chart;
        const meta = chart.getDatasetMeta(0);
        const index = context.dataIndex;
        const bar = meta.data[index] as BarElement & { base: number };
        const { x, y, base } = bar || {};

        if (!bar) return colors.sky500;

        const gradient = ctx.createLinearGradient(x, base, x, y);
        gradient.addColorStop(0, colors.sky500);
        gradient.addColorStop(1, colors.purple500);
        return gradient;
      },
      barThickness: 32,
      borderRadius: 2,
      borderSkipped: false,
      order: 2,
    },
  ];

  if (withLine) {
    datasets.push({
      type: 'line',
      label: '',
      data: data.map((item) => item.lineValue),
      borderColor: colors.pink300,
      borderWidth: 2,
      pointRadius: 0,
      order: 1,
    });
  }

  const chartData: ChartData<'bar' | 'line'> = {
    labels: data.map((item) => item.label),
    datasets,
  };

  return (
    <Box sx={sx}>
      <Chart
        type={'bar'}
        data={chartData}
        options={{
          maintainAspectRatio: false,
          devicePixelRatio: 2,
          scales: {
            y: {
              ticks: {
                stepSize: withLine ? 0.2 : 0,
                callback: yLabelsCallback,
              },
            },
            y1: {
              display: !!withLine,
            },
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                color: colors.slate500,
              },
            },
          },
        }}
      />
    </Box>
  );
};
