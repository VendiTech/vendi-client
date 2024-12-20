'use client';

import { ResetPasswordForm } from '@/ui/organisms/Forms/ResetPasswordForm';
import { AuthLayout } from '@/ui/templates/AuthLayout';
import { AuthTemplate } from '@/ui/templates/AuthTemplate';
import { useAuthResetPassword } from './hooks/useAuthResetPassword';

export const ResetPasswordPage = () => {
  const { mutateAsync, isPending } = useAuthResetPassword();

  return (
    <AuthLayout>
      <AuthTemplate>
        <ResetPasswordForm handler={mutateAsync} isLoading={isPending} />
      </AuthTemplate>
    </AuthLayout>
  );
};
