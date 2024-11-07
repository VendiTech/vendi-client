import { ForgotPasswordForm } from '@/ui/organisms/Forms/ForgotPasswordForm/ForgotPasswordForm';
import { AuthLayout } from '@/ui/templates/AuthLayout/AuthLayout';
import { AuthTemplate } from '@/ui/templates/AuthTemplate/AuthTemplate';
import { useAuthForgotPassword } from './hooks/useAuthForgotPassword';

export const ForgotPasswordPage = () => {
  const { mutateAsync } = useAuthForgotPassword();

  return (
    <AuthLayout>
      <AuthTemplate>
        <ForgotPasswordForm handler={mutateAsync} />
      </AuthTemplate>
    </AuthLayout>
  );
};
