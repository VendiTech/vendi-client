import { createModalHook } from '@/lib/services/Modals';
import { BaseScheduleModal, ScheduleModalProps } from './BaseScheduleModal';

export const CreateScheduleModal = (props: ScheduleModalProps) => {
  return <BaseScheduleModal {...props} />;
};

export const useCreateScheduleModal = createModalHook<ScheduleModalProps>(
  (props) => <CreateScheduleModal {...props} />,
);
