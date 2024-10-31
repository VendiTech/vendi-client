import { colors } from '@/assets/styles/variables';
import { PluginChartOptions } from 'chart.js';
import { DeepPartial } from '../utilits/deep-partial';

export const tooltipConfig: DeepPartial<
  PluginChartOptions<'bar' | 'line'>['plugins']['tooltip']
> = {
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
};
