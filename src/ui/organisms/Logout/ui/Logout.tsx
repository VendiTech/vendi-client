import { Button } from '@/ui/atoms/Button';
import { useLogoutModal } from './LogoutModal';

export const Logout = () => {
  const [logout] = useLogoutModal();

  return (
    <Button
      variant={'outlined'}
      color={'secondary'}
      size={'small'}
      onClick={logout}>
      Logout
    </Button>
  );
};
