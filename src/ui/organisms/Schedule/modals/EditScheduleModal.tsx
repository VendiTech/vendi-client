import { createModalHook } from '@/lib/services/Modals';
import { BaseScheduleModal, ScheduleModalProps } from './BaseScheduleModal';
import { ScheduleEnum } from '@/lib/generated/api';

type Props = {
  currentScheduleLevel: ScheduleEnum;
  onRemove: () => void;
} & ScheduleModalProps;

export const EditScheduleModal = (props: Props) => {
  return <BaseScheduleModal {...props} />;
};

export const useEditScheduleModal = createModalHook<Props>((props) => (
  <EditScheduleModal {...props} />
));
