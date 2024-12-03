'use client';

import { ForgotPasswordForm } from '@/ui/organisms/Forms/ForgotPasswordForm/ForgotPasswordForm';
import { AuthLayout } from '@/ui/templates/AuthLayout/AuthLayout';
import { AuthTemplate } from '@/ui/templates/AuthTemplate/AuthTemplate';
import { useAuthForgotPassword } from './hooks/useAuthForgotPassword';
import { Box, Typography } from '@mui/material';

export const ForgotPasswordPage = () => {
  const { mutateAsync, isPending, isSuccess } = useAuthForgotPassword();

  return (
    <AuthLayout>
      <AuthTemplate>
        {isSuccess ? (
          <Box
            style={{
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}>
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
              Message has been sent to your email!
            </Typography>
          </Box>
        ) : (
          <ForgotPasswordForm handler={mutateAsync} isLoading={isPending} />
        )}
      </AuthTemplate>
    </AuthLayout>
  );
};
