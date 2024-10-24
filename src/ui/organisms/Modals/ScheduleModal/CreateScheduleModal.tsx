import { createModalHook } from '@/lib/services/Modals';
import { ModalProps } from '@/ui/molecules/BaseModal';
import { BaseScheduleModal } from './BaseScheduleModal';

export const CreateScheduleModal = (props: ModalProps) => {
  return <BaseScheduleModal {...props} />;
};

export const useCreateScheduleModal = createModalHook<ModalProps>((props) => (
  <CreateScheduleModal {...props} />
));
