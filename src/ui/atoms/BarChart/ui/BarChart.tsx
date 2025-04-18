import { useRef } from 'react';
import { Chart } from 'react-chartjs-2';
import { BarElement, ChartData, ChartDataset } from 'chart.js';
import { Box } from '@mui/material';
import { colors } from '@/assets/styles/variables';
import { NoData } from '@/ui/atoms/NoData';
import { ageVerifiedPlugin } from '../helpers/age-verified-plugin';
import { loadingMockData } from '../helpers/loading-mock-data';
import { BarChartProps } from '../types';
import { useHandleScrollToEnd } from '@/lib/helpers/useHandleScrollToEnd';

export const BarChart = (props: BarChartProps) => {
  const { data, yLabelsCallback, ageVerified, withLine, isLoading, fetchNext } =
    props;

  const containerRef = useRef<HTMLDivElement>(null);

  const displayData = isLoading ? loadingMockData : data;

  const datasets: ChartDataset<'bar' | 'line'>[] = [
    {
      type: 'bar',
      label: '',
      data:
        !withLine || (withLine && props.showBars)
          ? displayData.map((item) => item.value)
          : [],
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

  const maxYValueApproximate = Math.max(
    ...displayData.map((item) => item.value),
  );

  const maxLineValue = withLine
    ? Math.max(...data.map((item) => item.lineValue))
    : 0;

  const lineValueMultiplier = maxYValueApproximate / maxLineValue;

  if (withLine && !isLoading && props.showLine) {
    datasets.push({
      type: 'line',
      label: '',
      data: data.map((item) => item.lineValue * lineValueMultiplier),
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
      if (data[highestBarIndex]?.value < data[i]?.value) {
        highestBarIndex = i;
      }
    }
  }

  const handleScrollToEnd = useHandleScrollToEnd(
    fetchNext,
    ({ scrollLeft, scrollWidth, clientWidth }) =>
      scrollLeft + clientWidth >= scrollWidth - 10,
  );

  return (
    <Box
      onScroll={handleScrollToEnd}
      ref={containerRef}
      sx={{
        display: 'flex',
        position: 'relative',
        height: '100%',
        flexGrow: 1,
        overflowX: 'auto',
      }}>
      <Box
        sx={{
          flexGrow: 1,
          minWidth: Math.max(
            data.length * 40,
            containerRef.current?.clientWidth ?? 0,
          ),
        }}>
        <Chart
          key={String(isLoading)}
          type={'bar'}
          data={chartData}
          options={{
            interaction: {
              mode: 'nearest',
              intersect: false,
            },
            animation: isLoading ? false : undefined,
            maintainAspectRatio: false,
            scales: {
              y: {
                ticks: {
                  display: !isLoading,
                  stepSize: withLine ? 0.2 : 0,
                  callback: yLabelsCallback,
                },
              },
              y1: {
                display: isLoading ? false : !!withLine,
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
              tooltip: {
                enabled: !isLoading,
                callbacks: {
                  label: (context) => {
                    const dataPoints = context.chart.tooltip?.dataPoints;

                    if (!dataPoints?.length) {
                      return '';
                    }

                    if (
                      dataPoints.length !== 1 &&
                      dataPoints[0].datasetIndex !== context.datasetIndex
                    ) {
                      return '';
                    }

                    if (context.datasetIndex === 1) {
                      return String(
                        Math.round(
                          (Number(context.raw) / lineValueMultiplier) * 100,
                        ) / 100,
                      );
                    }

                    return context.formattedValue;
                  },
                },
              },
            },
          }}
          plugins={
            ageVerified && !isLoading
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
      </Box>

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
