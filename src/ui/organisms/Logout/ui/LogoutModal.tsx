import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Routes } from '@/lib/constants/routes';
import { createModalHook } from '@/lib/services/Modals';
import { BaseConfirmationModal } from '@/ui/organisms/Modals';
import { ModalProps } from '@/ui/molecules/BaseModal';
import { useAuthLogout } from '../hooks/useAuthLogout';

type Props = Omit<ModalProps, 'onConfirm'>;

const LogoutModal = (props: Props) => {
  const { mutateAsync } = useAuthLogout();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await mutateAsync();

      router.push(Routes.SignIn);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseConfirmationModal
      {...props}
      onConfirm={handleLogout}
      title={'Logout'}
      confirmButtonText={'Logout'}>
      <Typography variant={'sm-regular'}>
        You will be logged out. Continue?
      </Typography>
    </BaseConfirmationModal>
  );
};

export const useLogoutModal = createModalHook<Props>((props) => (
  <LogoutModal {...props} />
));
