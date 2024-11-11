'use client'

import { SignInForm } from '@/ui/organisms/Forms/SignInForm';
import { AuthLayout } from '@/ui/templates/AuthLayout';
import { AuthTemplate } from '@/ui/templates/AuthTemplate';
import { useAuthLogin } from './hooks/useAuthLogin';

export const LoginPage = () => {
  const { mutateAsync } = useAuthLogin();

  return (
    <AuthLayout>
      <AuthTemplate>
        <SignInForm handler={mutateAsync} />
      </AuthTemplate>
    </AuthLayout>
  );
};
