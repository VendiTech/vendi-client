'use client';

import { PropsWithChildren, useLayoutEffect } from 'react';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { tooltipConfig } from './config/tooltip';
import { scalesConfig } from './config/scales';
import { deepMerge } from './utilits/deep-merge';

const setup = () => {
  ChartJS.register(
    Tooltip,
    BarElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Filler,
  );

  ChartJS.defaults.plugins.tooltip = deepMerge(
    ChartJS.defaults.plugins.tooltip,
    tooltipConfig,
  );
  // ChartJS.overrides.bar.scales = deepMerge(scalesConfig, {});
};

export const ChartsProvider = ({ children }: PropsWithChildren) => {
  useLayoutEffect(setup, []);

  return children;
};
