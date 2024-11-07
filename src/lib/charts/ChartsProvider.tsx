'use client';

import { PropsWithChildren, useLayoutEffect } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { tooltipConfig } from './config/tooltip';
import { deepMerge } from './utilits/deep-merge';

const setup = () => {
  ChartJS.register(...registerables);

  ChartJS.defaults.devicePixelRatio = 2;

  ChartJS.defaults.plugins.tooltip = deepMerge(
    ChartJS.defaults.plugins.tooltip,
    tooltipConfig,
  );

  ChartJS.overrides.bar.scales = deepMerge(scalesConfig, {});

  ChartJS.overrides.line.scales = deepMerge(scalesConfig, {});
  ChartJS.overrides.line.interaction = {
    ...ChartJS.overrides.line.interaction,
    mode: 'nearest',
    intersect: false,
  };
  ChartJS.overrides.line.maintainAspectRatio = false;
  ChartJS.defaults.plugins.legend.display = false;
};

export const ChartsProvider = ({ children }: PropsWithChildren) => {
  useLayoutEffect(setup, []);

  return children;
};
