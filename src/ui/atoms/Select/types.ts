import { SelectChangeEvent, TextFieldProps } from "@mui/material";

export type OptionType = {
  key: string | number;
  value: string;
};

export type Props = TextFieldProps & {
  onChange?: (event: SelectChangeEvent<unknown>) => void;
  multiple?: boolean;
  options: OptionType[];
  defaultText?: string;
  showInput?: boolean;
};
