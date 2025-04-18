import { ButtonProps as MuiButtonProps } from '@mui/material';

export type ButtonProps = MuiButtonProps & {
  icon?: boolean;
  animationDisabled?: boolean;
};
