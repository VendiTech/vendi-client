import { Typography } from '@mui/material';
import { createModalHook } from '@/lib/services/Modals';
import { BaseConfirmationModal } from '@/ui/organisms/Modals';
import { ModalProps } from '@/ui/molecules/BaseModal';
import { useResetPassword } from '../hooks/useResetPassword';

type Props = {
  userId: number;
  username: string;
} & ModalProps;

export const ResetPasswordModal = (props: Props) => {
  const { userId, username, onConfirm, ...rest } = props;

  const { mutateAsync } = useResetPassword();

  const handler = async () => {
    onConfirm();

    return mutateAsync(userId);
  };

  return (
    <BaseConfirmationModal
      onConfirm={handler}
      {...rest}
      confirmButtonText={'Yes, reset password'}>
      <Typography variant={'sm-regular'} sx={{ color: 'var(--slate-500)' }}>
        Reset password for
        <Typography variant={'sm-semibold'}> {username}</Typography>? This action
        is irreversible.
      </Typography>
    </BaseConfirmationModal>
  );
};

export const useResetPasswordModal = createModalHook<Props>((props) => (
  <ResetPasswordModal {...props} />
));
