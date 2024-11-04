'use client';

import { Button } from '@/ui/atoms/Button';
import { ControlledInputField } from '@/ui/atoms/InputField/ControlledInputField';
import { Box, Checkbox, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuthLogin } from './hooks/useAuthLogin';
import { UserLoginSchema } from './types';
import { useRouter } from 'next/navigation';
import { useSignInSchema } from './hooks/useSignInSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const SignInForm = () => {
  const router = useRouter();

  const schema = useSignInSchema();

  type Schema = z.infer<typeof schema>;

  const methods = useForm<Schema>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const { mutateAsync } = useAuthLogin();

  // const onSubmit = async (params: UserLoginSchema) => {
  //   try {
  //     await mutateAsync(params);
  //     router.push('/admin');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onSubmit = async (params: UserLoginSchema) => {
    try {
      fetch(`${process.env.NEXT_PUBLIC_URL!}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: 'testtest',
          username: 'test@gmail.com',
        }),
      }).then(() => console.log('success'));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        style={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}>
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
          <Box display={'flex'} justifyContent={'space-between'}>
            <Stack gap={'8px'} direction={'row'} alignItems={'center'}>
              <Checkbox
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
            <Button size="small" variant="text">
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
      </form>
    </FormProvider>
  );
};
