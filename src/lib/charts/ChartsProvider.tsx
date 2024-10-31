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


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepMerge(target: any, source: any) {
  if (
    typeof target !== 'object' ||
    typeof source !== 'object' ||
    target === null ||
    source === null
  ) {
    return source;
  }

  const result = { ...target };

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }

  return result;
}

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
  ChartJS.overrides.bar.scales = deepMerge(scalesConfig, {});
};

export const ChartsProvider = ({ children }: PropsWithChildren) => {
  useLayoutEffect(setup, []);

  return children;
};
