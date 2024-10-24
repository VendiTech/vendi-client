import { ForgotPasswordForm } from '@/ui/organisms/Forms/ForgotPasswordForm/ForgotPasswordForm';
import { AuthLayout } from '@/ui/templates/AuthLayout/AuthLayout';
import { AuthTemplate } from '@/ui/templates/AuthTemplate/AuthTemplate';

export const ForgotPasswordPage = () => {
  return (
    <AuthLayout>
      <AuthTemplate>
        <ForgotPasswordForm />
      </AuthTemplate>
    </AuthLayout>
  );
};
