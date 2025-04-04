import { useFormContext } from 'react-hook-form';
import { Button } from './Button';
import { ButtonProps } from './types';

type Props = {
  isChanged?: boolean;
} & ButtonProps

export const ControlledButton = ({ isChanged, ...props }: Props) => {
  const {
    formState: { isDirty },
  } = useFormContext();

  return (
    <Button type="submit" variant="contained" disabled={isChanged ? false : !isDirty} {...props} />
  );
};
