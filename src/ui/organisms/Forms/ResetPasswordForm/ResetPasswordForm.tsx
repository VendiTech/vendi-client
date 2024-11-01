'use client';

import { Button } from '@/ui/atoms/Button';
import { ControlledInputField } from '@/ui/atoms/InputField/ControlledInputField';
import { Box, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuthResetPassword } from './hooks/useAuthResetPassword';
import { useResetPasswordSchema } from './hooks/useResetPasswordSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

export const ResetPasswordForm = () => {
  const router = useRouter();

  const schema = useResetPasswordSchema();

  type Schema = z.infer<typeof schema>;

  const methods = useForm<Schema>({
    defaultValues: {
      newPassword: '',
      reEnterNewPassword: '',
    },
    resolver: zodResolver(schema),
  });

  const password = methods.watch('newPassword');

  const { mutateAsync } = useAuthResetPassword();

  const onSubmit = async () => {
    try {
      await mutateAsync({ password: password, token: '' });

      router.push('/admin');
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
        </Stack>
      </form>
    </FormProvider>
  );
};
