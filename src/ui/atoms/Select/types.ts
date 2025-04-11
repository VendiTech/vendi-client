import { TextFieldProps } from '@mui/material';
import { ChangeEvent } from 'react';

export type OptionType = {
  key: string | number;
  value: string;
  displayValue?: string;
  children?: OptionType[];
};

export type NestedOptionType = OptionType & { 
  level: number
}

export enum SearchType {
  ByName = 'ByName',
  ByChildren = 'ByChildren',
  None = 'None',
}

export type BaseSelectProps = TextFieldProps & {
  onChange?: (event: { target: { value: unknown } }) => void;
  onSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  options: OptionType[];
  defaultText?: string;
  showInput?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  displayValue?: string;
  fetchNextPage?: (arg?: unknown) => void;
  isNested?: boolean;
  ignoreSearch?: boolean;
  showClearButton?: boolean;
};
