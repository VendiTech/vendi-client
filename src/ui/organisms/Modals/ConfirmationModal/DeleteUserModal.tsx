import { Typography } from '@mui/material';
import { createModalHook } from '@/lib/services/Modals';
import { ModalProps } from '@/ui/molecules/BaseModal';
import { BaseConfirmationModal } from './BaseConfirmationModal';

type Props = {
  username: string;
} & ModalProps;

export const DeleteUserModal = (props: Props) => {
  const { username, ...rest } = props;

  return (
    <BaseConfirmationModal {...rest} confirmButtonText={'Yes, delete account'}>
      <Typography variant={'sm-regular'} sx={{ color: 'var(--slate-500)' }}>
        <Typography variant={'sm-semibold'}>{username} </Typography>
        will be deleted. This action is irreversible.
      </Typography>
    </BaseConfirmationModal>
  );
};

export const useDeleteUserModal = createModalHook<Props>((props) => (
  <DeleteUserModal {...props} />
));
