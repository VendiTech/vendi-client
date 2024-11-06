export type Data = {
  values: number[];
  label: string;
};

export type MultiBarChartProps = {
  categories: string[];
  data: Data[];
  isLoading?: boolean;
};
