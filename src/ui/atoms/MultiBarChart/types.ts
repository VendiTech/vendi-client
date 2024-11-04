import { SxProps, Theme } from '@mui/material';

export type Data = {
  values: number[];
  label: string;
};

export type MultiBarChartProps = {
  categories: string[];
  data: Data[];
  sx?: SxProps<Theme>;
  isLoading?: boolean;
};
