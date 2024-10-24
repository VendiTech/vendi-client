import { Typography } from '@mui/material';
import { createModalHook } from '@/lib/services/Modals';
import { ModalProps } from '@/ui/molecules/BaseModal';
import { BaseConfirmationModal } from './BaseConfirmationModal';

export const ResetPasswordModal = (props: ModalProps) => {
  return (
    <BaseConfirmationModal
      {...props}
      confirmButtonText={'Yes, reset password'}>
      <Typography variant={'sm-regular'} sx={{ color: 'var(--slate-500)' }}>
        Reset password? This action is irreversible.
      </Typography>
    </BaseConfirmationModal>
  );
};

export const useResetPasswordModal = createModalHook<ModalProps>((props) => (
  <ResetPasswordModal {...props} />
));
