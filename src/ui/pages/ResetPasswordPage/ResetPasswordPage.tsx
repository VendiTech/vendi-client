import { ResetPasswordForm } from '@/ui/organisms/Forms/ResetPasswordForm/ResetPasswordForm';
import { AuthLayout } from '@/ui/templates/AuthLayout/AuthLayout';
import { AuthTemplate } from '@/ui/templates/AuthTemplate/AuthTemplate';

export const ResetPasswordPage = () => {
  return (
    <AuthLayout>
      <AuthTemplate>
        <ResetPasswordForm />
      </AuthTemplate>
    </AuthLayout>
  );
};
