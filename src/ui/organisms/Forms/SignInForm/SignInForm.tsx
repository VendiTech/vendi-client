/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/ui/atoms/Button';
import { ControlledInputField } from '@/ui/atoms/InputField/ControlledInputField';
import { Box, Checkbox, Stack, Typography } from '@mui/material';
import { useSignInSchema } from './hooks/useSignInSchema';
import { FormWrapper } from '@/lib/providers/FormProvider/FormProvider';
import { UserLoginSchema } from './types';
import { useEffect, useState } from 'react';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { Routes } from '@/lib/constants/routes';
import { LoadingContent } from '@/ui/atoms/LoadingContent';
import { getHttpErrorMessage } from '@/lib/helpers/getHttpErrorMessage';
import WarningIcon from '@/assets/icons/WarningIcon.svg';
import { FieldValues, SubmitHandler } from 'react-hook-form';

type Props = {
  handler: UseMutateAsyncFunction<
    AxiosResponse<any, any>,
    Error,
    UserLoginSchema,
    unknown
  >;
  isLoading: boolean;
};

export const SignInForm = (props: Props) => {
  const { handler, isLoading } = props;

  const [errorField, setErrorField] = useState('');

  const router = useRouter();

  const schema = useSignInSchema();

  const [values, setValues] = useState<UserLoginSchema | undefined>();

  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    const savedData = localStorage.getItem('remember');

    if (savedData) {
      const parsedData: UserLoginSchema = JSON.parse(savedData);

      setValues(parsedData);
      setIsChecked(true);
    }
  }, []);

  const onSubmit = async (params: UserLoginSchema) => {
    try {
      await handler(params);

      if (isChecked) {
        localStorage.setItem('remember', JSON.stringify(params));
      } else {
        localStorage.removeItem('remember');
      }

      router.push('/admin');
    } catch (error) {
      console.log(error);
      const message = getHttpErrorMessage(error);
      setErrorField(message);
    }
  };

  return (
    <FormWrapper
      defaultValues={{ password: '', username: '' }}
      values={values}
      onSubmit={onSubmit as SubmitHandler<FieldValues>}
      schema={schema}
      style={{
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
      <LoadingContent isLoading={isLoading}>
        <Stack gap={'32px'} width={'320px'}>
          <Box display={'flex'} gap={'8px'} flexDirection={'column'}>
            <Typography
              variant="sm-semibold"
              sx={{
                width: 'fit-content',
                lineHeight: '21px',
                background: 'var(--gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundColor: 'transparent',
              }}>
              Welcome back!
            </Typography>
            <Typography variant="2xl-medium" sx={{ lineHeight: '36px' }}>
              Sign in to your account
            </Typography>
          </Box>
          <Box display={'flex'} gap={'16px'} flexDirection={'column'}>
            <ControlledInputField
              label={'Email or username'}
              placeholder="Enter"
              name="username"
            />
            <ControlledInputField
              label={'Password'}
              placeholder="Password"
              withPassword
              type="password"
              name="password"
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
          <Box display={'flex'} justifyContent={'space-between'}>
            <Stack gap={'8px'} direction={'row'} alignItems={'center'}>
              <Checkbox
                value={isChecked}
                checked={isChecked}
                onChange={() => setIsChecked((prev) => !prev)}
                sx={{
                  width: '16px',
                  height: '16px',
                  '& .MuiSvgIcon-root': {
                    fill: 'var(--slate-200)',
                  },

                  '&.Mui-checked .MuiSvgIcon-root': {
                    fill: 'var(--sky-500)',
                  },
                }}
              />
              <Typography variant="sm-regular" sx={{ lineHeight: '18px' }}>
                Remember me
              </Typography>
            </Stack>
            <Button
              size="small"
              variant="text"
              onClick={() => router.push(Routes.ForgotPassword)}>
              <Typography variant="xs-semibold" sx={{ lineHeight: '18px' }}>
                Forgot password?
              </Typography>
            </Button>
          </Box>
          <Button fullWidth size="large" variant="contained" type="submit">
            <Typography variant="sm-medium" sx={{ lineHeight: '21px' }}>
              Sign In
            </Typography>
          </Button>
        </Stack>
      </LoadingContent>
    </FormWrapper>
  );
};
