import { createModalHook } from '@/lib/services/Modals';
import { ModalProps } from '@/ui/molecules/BaseModal';
import { BaseLoginModal } from './BaseLoginModal';

const CreateLoginModal = (props: ModalProps) => {
  return <BaseLoginModal {...props} title={'Create login'} />;
};

export const useCreateLoginModal = createModalHook<ModalProps>((props) => (
  <CreateLoginModal {...props} />
));
