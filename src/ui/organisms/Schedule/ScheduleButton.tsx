import { ExportTypeEnum, ScheduleEnum } from '@/lib/generated/api';
import ScheduleIcon from '@/assets/icons/CalendarEmpty.svg';
import { Button } from '@/ui/atoms/Button';
import { useCreateScheduleModal } from './modals/CreateScheduleModal';
import { useEditScheduleModal } from './modals/EditScheduleModal';
import { Chip } from '@/ui/atoms/Chip';

type ScheduleParams = {
  schedule: ScheduleEnum;
  exportType: ExportTypeEnum;
};

type Props = {
  currentSchedule?: ScheduleEnum;
  createSchedule: (params: ScheduleParams) => Promise<unknown>;
  editSchedule: (params: ScheduleParams) => Promise<unknown>;
  removeSchedule: () => Promise<unknown>;
};

export const ScheduleButton = (props: Props) => {
  const { createSchedule, editSchedule, removeSchedule, currentSchedule } =
    props;

  const [openCreateScheduleModal] = useCreateScheduleModal();
  const [openEditScheduleModal] = useEditScheduleModal();

  const handleEdit = () => {
    if (!currentSchedule) return;

    openEditScheduleModal({
      onConfirm: (schedule, exportType) => editSchedule({ schedule, exportType }),
      currentScheduleLevel: currentSchedule,
      onRemove: removeSchedule,
    });
  };

  const handleCreate = () =>
    openCreateScheduleModal({
      onConfirm: (schedule, exportType) =>
        createSchedule({ schedule, exportType }),
    });

  return (
    <Button
      variant={'outlined'}
      size={'small'}
      startIcon={<ScheduleIcon />}
      endIcon={
        currentSchedule ? (
          <Chip sx={{ fontSize: '12px !important' }} variant={'neutral'}>
            {currentSchedule}
          </Chip>
        ) : null
      }
      onClick={currentSchedule ? handleEdit : handleCreate}>
      Report scheduler
    </Button>
  );
};
