import { CSSProperties, ReactNode } from 'react';

export interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
  style?: CSSProperties;
}

export type TabsProps = {
  tabLabels: string[];
  tabComponents?: ReactNode[];
  additionalComponent?: ReactNode[];
  style?: CSSProperties;
};