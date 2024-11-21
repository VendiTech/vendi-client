import { Controller } from 'react-hook-form';
import { BaseSelect } from './Select';
import { BaseSelectProps } from './types';

type ControlledProps = Omit<BaseSelectProps, 'name'> & {
  name: string;
};

export const ControlledSelect = ({ ...rest }: ControlledProps) => {
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
