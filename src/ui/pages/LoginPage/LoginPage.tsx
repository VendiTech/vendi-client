'use client';

import { SignInForm } from '@/ui/organisms/Forms/SignInForm';
import { AuthLayout } from '@/ui/templates/AuthLayout';
import { AuthTemplate } from '@/ui/templates/AuthTemplate';
import { useAuthLogin } from './hooks/useAuthLogin';

export const LoginPage = () => {
  const { mutateAsync, isPending } = useAuthLogin();

  return (
    <AuthLayout>
      <AuthTemplate>
        <SignInForm handler={mutateAsync} isLoading={isPending} />
      </AuthTemplate>
    </AuthLayout>
  );
};
