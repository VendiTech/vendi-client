import { SelectChangeEvent, TextFieldProps } from '@mui/material';
import { ChangeEvent } from 'react';

export type OptionType = {
  key: string | number;
  value: string;
  displayValue?: string;
};

export type BaseSelectProps = TextFieldProps & {
  onChange?: (event: SelectChangeEvent<unknown>) => void;
  onSearchChange?: (events: ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  options: OptionType[];
  defaultText?: string;
  showInput?: boolean;
  minWidth?: number;
  showSearch?: boolean;
  searchPlaceholder?: string;
  displayValue?: string;
};
