import { Bar } from 'react-chartjs-2';
import { BarElement, Chart, ChartData, Tooltip } from 'chart.js';
import { Box, SxProps, Theme } from '@mui/material';
import { colors } from '@/assets/styles/variables';

Chart.register(BarElement, Tooltip);

type Props = {
  data: {
    label: string;
    value: number;
  }[];
  yLabelsCallback?: (labelValue: string | number) => string;
  sx?: SxProps<Theme>;
};

export const BarChart = (props: Props) => {
  const { data, yLabelsCallback, sx } = props;

  const chartData: ChartData<'bar'> = {
    labels: data.map((item) => item.label),
    datasets: [
      {
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
      },
    ],
  };

  return (
    <Box sx={sx}>
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          devicePixelRatio: 2,
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: colors.slate500,
                font: {
                  size: 12,
                  lineHeight: '18px',
                },
              },
              border: {
                color: colors.slate200,
              },
            },
            y: {
              grid: {
                color: colors.slate200,
                drawTicks: false,
              },
              ticks: {
                color: colors.slate500,
                font: {
                  size: 12,
                  lineHeight: '18px',
                },
                maxTicksLimit: 6,
                callback: yLabelsCallback,
              },
              border: {
                display: false,
                dash: [5, 4],
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              displayColors: false,
              padding: {
                x: 16,
                y: 10,
              },
              titleColor: colors.slate500,
              titleAlign: 'center',
              titleFont: {
                size: 12,
                lineHeight: '18px',
                weight: 400,
              },
              titleMarginBottom: 8,
              titleSpacing: 0,

              bodyColor: colors.slate900,
              bodyAlign: 'center',
              bodyFont: {
                size: 16,
                lineHeight: '24px',
                weight: 500,
              },
              bodySpacing: 0,

              footerColor: colors.slate500,
              footerAlign: 'center',
              footerFont: {
                size: 12,
                lineHeight: '18px',
                weight: 400,
              },
              footerMarginTop: 0,
              footerSpacing: 0,

              borderWidth: 1,
              backgroundColor: colors.slate000,
              borderColor: colors.slate200,
              yAlign: 'bottom',
              callbacks: {
                footer: () => '123',
              },
            },
          },
        }}
      />
    </Box>
  );
};
