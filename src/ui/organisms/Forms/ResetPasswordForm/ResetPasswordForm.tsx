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

type Props = {
  handler: UseMutateAsyncFunction<
    AxiosResponse<any, any>,
    Error,
    ResetPasswordSchema,
    unknown
  >;
};

export const ResetPasswordForm = (props: Props) => {
  const [supportingText, setSupportingText] = useState('');

  const { handler } = props;

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
      router.push(Routes.Dashboard);
    } catch (error) {
      setSupportingText('Validation error');
    }
  };

  return (
    <FormWrapper
      defaultValues={{ newPassword: '', reEnterNewPassword: '' }}
      schema={schema}
      onSubmit={onSubmit}
      style={{
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
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
        <Button fullWidth size="large" variant="contained" type="submit">
          <Typography variant="sm-medium">Reset password</Typography>
        </Button>
        {supportingText && (
          <Typography color="red">{supportingText}</Typography>
        )}
      </Stack>
    </FormWrapper>
  );
};
