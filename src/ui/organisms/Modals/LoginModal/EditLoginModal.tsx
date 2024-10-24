import { createModalHook } from '@/lib/services/Modals';
import { ModalProps } from '@/ui/molecules/BaseModal';
import { BaseLoginModal } from './BaseLoginModal';

type Props = {
  onDelete: () => void;
  onResetPassword: () => void;
} & ModalProps;

const EditLoginModal = (props: Props) => {
  return <BaseLoginModal {...props} title={'Edit login'} />;
};

export const useEditLoginModal = createModalHook<Props>((props) => (
  <EditLoginModal {...props} />
));
