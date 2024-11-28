import { AxiosResponse } from 'axios';
import { UseQueryResult } from '@tanstack/react-query';
import ScheduleIcon from '@/assets/icons/CalendarEmpty.svg';
import { UserExistingSchedulesSchema } from '@/lib/generated/api';
import { Button } from '@/ui/atoms/Button';
import { useScheduleModal } from './ScheduleModal';
import { ScheduleParams } from '../types';

type Props = {
  createSchedule: (params: ScheduleParams) => Promise<unknown>;
  removeSchedule: (id: string) => Promise<unknown>;
  useExistingSchedules: () => UseQueryResult<
    AxiosResponse<UserExistingSchedulesSchema[]>
  >;
};

export const ScheduleButton = (props: Props) => {
  const { createSchedule, removeSchedule, useExistingSchedules } = props;

  const [openModal] = useScheduleModal();

  const handleClick = () => {
    openModal({
      useExistingSchedules,
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
