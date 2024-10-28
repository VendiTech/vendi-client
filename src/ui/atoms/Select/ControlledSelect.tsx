import { Controller } from 'react-hook-form';
import { BaseSelect } from './Select';
import { Props } from './types';

type ControlledProps = Omit<Props, 'name'> & {
  name: string;
};

export const ControlledSelect = ({ name, ...rest }: ControlledProps) => {
  return (
    <Controller
      name=""
      render={({ field, fieldState: { error } }) => {
        return (
          <BaseSelect
            {...field}
            error={!!error}
            helperText={error?.message}
            {...rest}
          />
        );
      }}
    />
  );
};
