'use client';

import { Controller } from 'react-hook-form';
import { InputField } from './InputField';
import { Props } from './types';

type ControlledProps = Omit<Props, 'name'> & {
  name: string;
};

export const ControlledInputField = ({ name, ...rest }: ControlledProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <InputField
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
