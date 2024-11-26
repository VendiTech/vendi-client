import { CSSProperties, ReactNode, RefObject } from 'react';

export interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
  style?: CSSProperties;
}

export type TabsProps = {
  tabLabels: string[];
  tabLabelsContainer?: RefObject<Element>;
  tabComponents?: ReactNode[];
  additionalComponent?: ReactNode[];
  value?: number;
  onChange?: (value: number) => void;
  style?: CSSProperties;
};