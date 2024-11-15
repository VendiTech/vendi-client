import { colors } from '@/assets/styles/variables';
import { ScaleChartOptions } from 'chart.js';
import { DeepPartial } from '@/lib/charts/utilits/deep-partial';
import { parseNumber } from '@/lib/helpers/parse-number';

export const scalesConfig: DeepPartial<
  ScaleChartOptions<'bar' | 'line'>['scales']
> = {
  x: {
    type: 'category',
    offset: true,
    grid: {
      display: false,
      drawTicks: true,
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
    beginAtZero: true,
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
      callback: (labelValue: string) => `${parseNumber(+labelValue, true)}`
    },
    border: {
      display: false,
      dash: [5, 4],
    },
  },
  y1: {
    display: false,
    position: 'right',
    grid: {
      drawOnChartArea: false,
      drawTicks: false,
    },
    border: {
      display: false,
    },
    min: 0,
    max: 1,
    ticks: {
      color: colors.slate500,
      font: {
        size: 12,
        lineHeight: '18px',
      },
      stepSize: 0.2,
      maxTicksLimit: 6,
      callback: (value: unknown) => `${(value as number).toFixed(1)}`,
    },
  },
};
