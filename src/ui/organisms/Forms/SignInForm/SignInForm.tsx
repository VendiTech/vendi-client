'use client';

import { Button } from '@/ui/atoms/Button';
import { ControlledInputField } from '@/ui/atoms/InputField/ControlledInputField';
import { Box, Checkbox, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

export const SignInForm = ({ onSubmit }: { onSubmit?: () => void }) => {
  const methods = useForm({
    defaultValues: {
      username: 'admin',
      password: 'admin',
    },
  });

  const submit = () => {
    console.log('submit function');
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submit)}
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
                background: 'var(--gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundColor: 'transparent',
              }}>
              Welcome back!
            </Typography>
            <Typography variant="2xl-medium">
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
              <Typography variant="sm-regular">Remember me</Typography>
            </Stack>
            <Button size="small" variant="text">
              <Typography variant="xs-semibold">Forgot password?</Typography>
            </Button>
          </Box>
          <Button fullWidth size="large" variant="contained" type="submit">
            <Typography variant="sm-medium">Sign In</Typography>
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};
