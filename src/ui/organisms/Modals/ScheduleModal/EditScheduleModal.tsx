import { createModalHook } from '@/lib/services/Modals';
import { ModalProps } from '@/ui/molecules/BaseModal';
import { BaseScheduleModal } from './BaseScheduleModal';
import { ScheduleLevel } from './types';

type Props = {
  currentScheduleLevel: ScheduleLevel;
  onRemove: () => void;
} & ModalProps;

export const EditScheduleModal = (props: Props) => {
  return <BaseScheduleModal {...props} />;
};

export const useEditScheduleModal = createModalHook<Props>((props) => (
  <EditScheduleModal {...props} />
));
