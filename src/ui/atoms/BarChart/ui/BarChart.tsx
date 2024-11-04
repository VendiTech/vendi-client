import { Chart } from 'react-chartjs-2';
import { BarElement, ChartData, ChartDataset } from 'chart.js';
import { Box, SxProps, Theme } from '@mui/material';
import { colors } from '@/assets/styles/variables';
import { ageVerifiedPlugin } from '../helpers/age-verified-plugin';
import { NoData } from '@/ui/atoms/NoData';

type Data = {
  label: string;
  value: number;
};

type BaseProps = {
  yLabelsCallback?: (labelValue: string | number) => string;
  ageVerified?: {
    startBar: number;
    endBar: number;
  };
  isLoading?: boolean;
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

const loadingMockData: Data[] = [
  { label: '', value: 30 },
  { label: '', value: 155 },
  { label: '', value: 75 },
  { label: '', value: 110 },
  { label: '', value: 40 },
];

export const BarChart = (
  props: (PropsWithLine | PropsWithoutLine) & BaseProps,
) => {
  const { data, yLabelsCallback, ageVerified, withLine, isLoading, sx } = props;

  const displayData = isLoading ? loadingMockData : data;

  const datasets: ChartDataset<'bar' | 'line'>[] = [
    {
      type: 'bar',
      label: '',
      data: displayData.map((item) => item.value),
      backgroundColor: isLoading ? colors.slate050 : colors.sky500,
      hoverBackgroundColor: (context) => {
        if (isLoading) return colors.slate050;

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

  if (withLine && !isLoading) {
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
    labels: displayData.map((item) => item.label),
    datasets,
  };

  let highestBarIndex = ageVerified?.startBar ?? 0;

  if (ageVerified && !isLoading) {
    for (let i = ageVerified.startBar; i <= ageVerified.endBar; i++) {
      if (data[highestBarIndex].value < data[i].value) {
        highestBarIndex = i;
      }
    }
  }

  return (
    <Box
      sx={{
        position: 'relative',
        ...sx,
      }}>
      <Chart
        type={'bar'}
        data={chartData}
        options={{
          animation: isLoading ? false : undefined,
          maintainAspectRatio: false,
          devicePixelRatio: 2,
          scales: {
            y: {
              ticks: {
                display: !isLoading,
                stepSize: withLine ? 0.2 : 0,
                callback: yLabelsCallback,
              },
            },
            y1: {
              display: !!withLine,
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
            legend: {
              display: true,
              labels: {
                color: colors.slate500,
              },
            },
            tooltip: {
              enabled: !isLoading,
            },
          },
        }}
        plugins={
          ageVerified
            ? [
                ageVerifiedPlugin(
                  ageVerified.startBar,
                  ageVerified.endBar,
                  highestBarIndex,
                ),
              ]
            : []
        }
      />

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
      ) : null}
    </Box>
  );
};
