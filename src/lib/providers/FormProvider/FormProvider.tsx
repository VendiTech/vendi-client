/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { extractDirtyFields } from '@/lib/helpers/extractDirtyFields';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CSSProperties,
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  FormProvider,
  useForm,
  FieldValues,
  DefaultValues,
  SubmitHandler,
  UseFormSetError,
} from 'react-hook-form';
import { z } from 'zod';

type Props<T extends FieldValues> = {
  defaultValues: DefaultValues<T>;
  onSubmit?: SubmitHandler<T>;
  schema: z.ZodType<T, any, any>;
  style?: CSSProperties;
  dirtyOnly?: boolean;
  values?: T;
};

export type SetErrorRef<T extends FieldValues> = {
  setError: UseFormSetError<T>;
};

export const FormWrapper = forwardRef(
  <T extends FieldValues>(
    props: PropsWithChildren<Props<T>>,
    ref: ForwardedRef<SetErrorRef<T>>,
  ) => {
    const {
      defaultValues,
      onSubmit,
      schema,
      style,
      children,
      dirtyOnly = false,
      values,
    } = props;

    const methods = useForm<T>({
      defaultValues,
      values,
      resolver: zodResolver(schema),
      reValidateMode: 'onSubmit',
    });

    useImperativeHandle(
      ref,
      () => ({
        setError: methods.setError,
      }),
      [methods],
    );

    const handleDirtyFields = (params: T) => {
      const data = extractDirtyFields(params, methods.formState.dirtyFields);
      void onSubmit?.(data as T);
      methods.reset(params);
    };

    return (
      <FormProvider {...methods}>
        <form
          onSubmit={
            onSubmit &&
            methods.handleSubmit(dirtyOnly ? handleDirtyFields : onSubmit)
          }
          style={style}>
          {children}
        </form>
      </FormProvider>
    );
  },
);

FormWrapper.displayName = 'FormWrapper';
