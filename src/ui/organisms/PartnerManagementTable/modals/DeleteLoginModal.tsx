import { Typography } from '@mui/material';
import { createModalHook } from '@/lib/services/Modals';
import { BaseConfirmationModal } from '@/ui/organisms/Modals';
import { ModalProps } from '@/ui/molecules/BaseModal';
import { useDeleteUser } from '../hooks/useDeleteUser';

type Props = {
  userId: number;
  username: string;
} & ModalProps;

export const DeleteLoginModal = (props: Props) => {
  const { userId, username, onConfirm, ...rest } = props;

  const { mutateAsync } = useDeleteUser();

  const handler = async () => {
    try {
      await mutateAsync(userId)
      
      onConfirm(); 
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <BaseConfirmationModal
      {...rest}
      onConfirm={handler}
      confirmButtonText={'Yes, delete account'}>
      <Typography variant={'sm-regular'} sx={{ color: 'var(--slate-500)' }}>
        <Typography variant={'sm-semibold'}>{username} </Typography>
        will be deleted. This action is irreversible.
      </Typography>
    </BaseConfirmationModal>
  );
};

export const useDeleteUserModal = createModalHook<Props>((props) => (
  <DeleteLoginModal {...props} />
));
