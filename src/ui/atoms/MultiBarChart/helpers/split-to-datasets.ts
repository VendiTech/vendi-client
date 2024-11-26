import { MultiBarChartData } from '../types';

export const splitToDatasets = (data: MultiBarChartData[]) => {
  const result: number[][] = [];

  data.forEach((item) => {
    item.values.forEach((value, i) => {
      if (!result[i]) {
        result[i] = [];
      }
      result[i].push(value);
    });
  });

  return result;
};
