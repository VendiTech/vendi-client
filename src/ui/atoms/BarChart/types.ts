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
};

type PropsWithLine = {
  data: (Data & { lineValue: number })[];
  withLine?: true;
};

type PropsWithoutLine = {
  data: Data[];
  withLine?: false;
};

export type BarChartProps = (PropsWithLine | PropsWithoutLine) & BaseProps;
