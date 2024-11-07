/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { extractDirtyFields } from '@/lib/helpers/extractDirtyFields';
import { zodResolver } from '@hookform/resolvers/zod';
import { CSSProperties, PropsWithChildren } from 'react';
import {
  FormProvider,
  useForm,
  FieldValues,
  DefaultValues,
  SubmitHandler,
} from 'react-hook-form';
import { z } from 'zod';

type Props<T extends FieldValues> = {
  defaultValues: T;
  onSubmit: SubmitHandler<T>;
  schema: z.ZodType<T, any, any>;
  style?: CSSProperties;
  dirtyOnly?: boolean;
};

export const FormWrapper = <T extends FieldValues>(
  props: PropsWithChildren<Props<T>>,
) => {
  const {
    defaultValues,
    onSubmit,
    schema,
    style,
    children,
    dirtyOnly = false,
  } = props;

  const methods = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
    resolver: zodResolver(schema),
    reValidateMode: 'onSubmit',
  });

  const handleDirtyFields = (params: T) => {
    const data = extractDirtyFields(params, methods.formState.dirtyFields);
    void onSubmit(data as T);
    methods.reset(params);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(
          dirtyOnly ? handleDirtyFields : onSubmit,
        )}
        style={style}>
        {children}
      </form>
    </FormProvider>
  );
};
