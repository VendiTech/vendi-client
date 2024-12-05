/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/ui/atoms/Button';
import { ControlledInputField } from '@/ui/atoms/InputField/ControlledInputField';
import { Box, Stack, Typography } from '@mui/material';
import { useResetPasswordSchema } from './hooks/useResetPasswordSchema';
import { useRouter, useSearchParams } from 'next/navigation';
import { AxiosResponse } from 'axios';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { ResetPasswordSchema } from './types';
import { FormWrapper } from '@/lib/providers/FormProvider/FormProvider';
import { z } from 'zod';
import { Routes } from '@/lib/constants/routes';
import { useState } from 'react';
import { LoadingContent } from '@/ui/atoms/LoadingContent';
import { getHttpErrorMessage } from '@/lib/helpers/getHttpErrorMessage';
import WarningIcon from '@/assets/icons/WarningIcon.svg';
import { FieldValues, SubmitHandler } from 'react-hook-form';

type Props = {
  handler: UseMutateAsyncFunction<
    AxiosResponse<any, any>,
    Error,
    ResetPasswordSchema,
    unknown
  >;
  isLoading: boolean;
};

export const ResetPasswordForm = (props: Props) => {
  const { handler, isLoading } = props;

  const [errorField, setErrorField] = useState('');

  const router = useRouter();

  const searchParams = useSearchParams();

  const search = searchParams.get('token');

  if (!search) {
    router.push(Routes.SignIn);
  }

  const schema = useResetPasswordSchema();

  type Schema = z.infer<typeof schema>;

  const onSubmit = async (params: Schema) => {
    try {
      await handler({
        password: params.newPassword,
        token: search!,
      });
      router.push(Routes.SignIn);
    } catch (error) {
      console.log(error);
      const message = getHttpErrorMessage(error);
      setErrorField(message);
    }
  };

  return (
    <FormWrapper
      defaultValues={{ newPassword: '', reEnterNewPassword: '' }}
      schema={schema}
      onSubmit={onSubmit as SubmitHandler<FieldValues>}
      style={{
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
      <LoadingContent isLoading={isLoading}>
        <Stack
          gap={'32px'}
          justifyContent={'center'}
          width={'320px'}
          sx={{ flex: 1 }}>
          <Box display={'flex'} gap={'8px'} flexDirection={'column'}>
            <Typography variant="2xl-medium">Reset password</Typography>
            <Typography variant="sm-regular" color="var(--slate-500)">
              Enter new password
            </Typography>
          </Box>
          <Box display={'flex'} gap={'16px'} flexDirection={'column'}>
            <ControlledInputField
              label={'New password'}
              placeholder="New password"
              withPassword
              type="password"
              name="newPassword"
            />
            <ControlledInputField
              label={'Re-enter password'}
              placeholder="'Re-enter password'"
              withPassword
              type="password"
              name="reEnterNewPassword"
            />
          </Box>
          {errorField && (
            <Box
              sx={{ color: 'var(--red-500)' }}
              display={'flex'}
              alignItems={'center'}
              gap={'5px'}>
              <WarningIcon />
              <Typography variant="xs-regular">{errorField}</Typography>
            </Box>
          )}
          <Button fullWidth size="large" variant="contained" type="submit">
            <Typography variant="sm-medium">Reset password</Typography>
          </Button>
        </Stack>
      </LoadingContent>
    </FormWrapper>
  );
};
