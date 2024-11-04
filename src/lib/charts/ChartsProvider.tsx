'use client';

import { PropsWithChildren, useLayoutEffect } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { tooltipConfig } from './config/tooltip';
import { scalesConfig } from './config/scales';
import { deepMerge } from './utilits/deep-merge';

const setup = () => {
  ChartJS.register(...registerables);

  ChartJS.defaults.plugins.tooltip = deepMerge(
    ChartJS.defaults.plugins.tooltip,
    tooltipConfig,
  );
  
  ChartJS.overrides.bar.scales = deepMerge(scalesConfig, {});
  
  ChartJS.defaults.plugins.legend.display = false
  
  ChartJS.defaults.animation
};

export const ChartsProvider = ({ children }: PropsWithChildren) => {
  useLayoutEffect(setup, []);

  return children;
};
