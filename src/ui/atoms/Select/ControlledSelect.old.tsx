/* eslint-disable @typescript-eslint/no-explicit-any */

import { Controller } from 'react-hook-form';
import { BaseSelect } from './Select.old';
import { BaseSelectProps } from './types';

type ControlledProps = Omit<BaseSelectProps, 'name'> & {
  name: string;
};

export const ControlledSelectOld = ({ name, onChange, ...rest }: ControlledProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        const handleChange = (value: any) => {
          field.onChange(value);
          onChange?.(value);
        };

        return (
          <BaseSelect
            {...field}
            error={!!error}
            helperText={error?.message}
            {...rest}
            onChange={handleChange}
          />
        );
      }}
    />
  );
};
