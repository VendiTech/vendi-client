export type MultiBarChartData = {
  values: number[];
  label: string;
};

export type MultiBarChartProps = {
  categories: { title: string; color: string }[];
  data: MultiBarChartData[];
  isLoading?: boolean;
};
