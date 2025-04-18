export type Data = {
  label: string;
  value: number;
};

type BaseProps = {
  yLabelsCallback?: (labelValue: string | number) => string;
  ageVerified?: {
    startBar: number;
    endBar: number;
  };
  isLoading?: boolean;
  fetchNext?: () => void
};

type PropsWithLine = {
  data: (Data & { lineValue: number })[];
  withLine?: true;
  showLine?: boolean;
  showBars?: boolean
};

type PropsWithoutLine = {
  data: Data[];
  withLine?: false;
};

export type BarChartProps = (PropsWithLine | PropsWithoutLine) & BaseProps;
