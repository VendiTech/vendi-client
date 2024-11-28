import ScheduleIcon from '@/assets/icons/CalendarEmpty.svg';
import { Button } from '@/ui/atoms/Button';
import { useScheduleModal } from './ScheduleModal';
import { ScheduleParams } from '../types';
import { UserExistingSchedulesSchema } from '@/lib/generated/api';

type Props = {
  createSchedule: (params: ScheduleParams) => Promise<unknown>;
  removeSchedule: (id: string) => Promise<unknown>;
  existingSchedules?: UserExistingSchedulesSchema[];
};

export const ScheduleButton = (props: Props) => {
  const { createSchedule, removeSchedule, existingSchedules } = props;

  const [openModal] = useScheduleModal();

  const handleClick = () => {
    openModal({
      existingSchedules,
      onCreate: createSchedule,
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
