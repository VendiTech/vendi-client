import { TextFieldProps } from '@mui/material';
import { HTMLInputTypeAttribute } from 'react';

export type Props = TextFieldProps & {
  withSearch?: boolean;
  withPassword?: boolean;
  defaultText?: string;
  type?: HTMLInputTypeAttribute;
};
