import { SignInForm } from '@/ui/organisms/Forms/SignInForm/SignInForm';
import { AuthLayout } from '@/ui/templates/AuthLayout/AuthLayout';
import { AuthTemplate } from '@/ui/templates/AuthTemplate/AuthTemplate';

export const LoginPage = () => {
  return (
    <AuthLayout>
      <AuthTemplate>
        <SignInForm />
      </AuthTemplate>
    </AuthLayout>
  );
};
