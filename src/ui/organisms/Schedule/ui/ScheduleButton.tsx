import ScheduleIcon from '@/assets/icons/CalendarEmpty.svg';
import { Button } from '@/ui/atoms/Button';
import { useScheduleModal } from './ScheduleModal';
import { CurrentSchedule, ScheduleParams } from '../types';
import { UserExistingSchedulesSchema } from '@/lib/generated/api';

type Props = {
  currentSchedule?: CurrentSchedule;
  createSchedule: (params: ScheduleParams) => Promise<unknown>;
  editSchedule: (params: ScheduleParams) => Promise<unknown>;
  removeSchedule: () => Promise<unknown>;
  existingSchedules?: UserExistingSchedulesSchema[]
};

export const ScheduleButton = (props: Props) => {
  const { createSchedule, editSchedule, removeSchedule, currentSchedule, existingSchedules } =
    props;

  const [openModal] = useScheduleModal();

  const handleClick = () => {
    if (!currentSchedule) return;

    openModal({
      currentSchedule,
      existingSchedules,
      onCreate: createSchedule,
      onEdit: editSchedule,
      onRemove: removeSchedule,
    });
  };

  return (
    <Button
      variant={'outlined'}
      size={'small'}
      startIcon={<ScheduleIcon />}
      onClick={handleClick}>
      Report scheduler
    </Button>
  );
};
