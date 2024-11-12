import { useFormContext } from 'react-hook-form';
import { Button } from './Button';
import { ButtonProps } from './types';

export const ControlledButton = (props: ButtonProps) => {
  const {
    formState: { isDirty },
  } = useFormContext();

  return (
    <Button type="submit" variant="contained" disabled={!isDirty} {...props} />
  );
};
