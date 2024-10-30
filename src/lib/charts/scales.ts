import { colors } from '@/assets/styles/variables';
import { ScaleChartOptions } from 'chart.js';

// @ts-expect-error import nested file
import { _DeepPartialObject } from 'chart.js/dist/types/utils';

type Args = {
  showAdditionalY?: boolean,
  yLabelsCallback?: (labelValue: string | number) => string
}

export const getChartScalesConfig = ({ showAdditionalY, yLabelsCallback }: Args): _DeepPartialObject<
  ScaleChartOptions<'bar' | 'line'>['scales']
> => ({
  x: {
    grid: {
      display: false
    },
    ticks: {
      color: colors.slate500,
      font: {
        size: 12,
        lineHeight: '18px'
      }
    },
    border: {
      color: colors.slate200
    }
  },
  y: {
    grid: {
      color: colors.slate200,
      drawTicks: false
    },
    ticks: {
      color: colors.slate500,
      font: {
        size: 12,
        lineHeight: '18px'
      },
      stepSize: showAdditionalY ? 0.2 : 0,
      maxTicksLimit: 6,
      callback: yLabelsCallback
    },
    border: {
      display: false,
      dash: [5, 4]
    }
  },
  y1: {
    display: !!showAdditionalY,
    position: 'right',
    grid: {
      drawOnChartArea: false,
      drawTicks: false
    },
    border: {
      display: false
    },
    min: 0,
    max: 1,
    ticks: {
      color: colors.slate500,
      font: {
        size: 12,
        lineHeight: '18px'
      },
      stepSize: 0.2,
      maxTicksLimit: 6,
      callback: (value: unknown) => `${(value as number).toFixed(1)}`
    }
  }
});
