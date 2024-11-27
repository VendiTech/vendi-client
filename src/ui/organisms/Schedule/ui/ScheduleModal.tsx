import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { ExportTypeEnum, ScheduleEnum } from '@/lib/generated/api';
import { createModalHook } from '@/lib/services/Modals';
import InfoIcon from '@/assets/icons/Info.svg';
import { CurrentSchedule, ScheduleParams } from '@/ui/organisms/Schedule/types';
import { BaseModal, ModalProps } from '@/ui/molecules/BaseModal';
import { Button } from '@/ui/atoms/Button';
import { BasicTab } from '@/ui/atoms/Tabs';
import { Chip } from '@/ui/atoms/Chip';
import { RadioButton } from './RadioButton';

type Props = {
  onRemove?: () => void;
  onCreate: (params: ScheduleParams) => void;
  onEdit: (params: ScheduleParams) => void;
  currentSchedule: CurrentSchedule;
} & Omit<ModalProps, 'onConfirm'>;

export const ScheduleModal = (props: Props) => {
  const { onClose, onCreate, onEdit, onRemove, currentSchedule } = props;

  const [selectedExportType, setSelectedExportType] = useState(
    currentSchedule.Excel ? ExportTypeEnum.Excel : ExportTypeEnum.Csv,
  );

  const [selectedScheduleLevel, setSelectedScheduleLevel] = useState(
    currentSchedule[selectedExportType] ?? ScheduleEnum.Monthly,
  );

  useEffect(() => {
    if (!currentSchedule[selectedExportType]) return;

    setSelectedScheduleLevel(currentSchedule[selectedExportType]);
  }, [currentSchedule, selectedExportType]);

  const handleConfirm = () => {
    const scheduleParams = {
      schedule: selectedScheduleLevel,
      exportType: selectedExportType,
    };

    if (currentSchedule[selectedExportType]) {
      onEdit(scheduleParams);
    } else {
      onCreate(scheduleParams);
    }

    onClose();
  };

  return (
    <BaseModal
      wrapperProps={{}}
      onClose={onClose}
      title={
        <Box
          sx={{ display: 'flex', gap: 1, alignItems: 'center', minHeight: 22 }}>
          Schedule this report
          {currentSchedule[selectedExportType] ? (
            <Chip sx={{ fontSize: '12px !important' }} variant={'neutral'}>
              {currentSchedule[selectedExportType]}
            </Chip>
          ) : null}
        </Box>
      }
      actionButtons={
        <>
          <Button variant={'outlined'} onClick={onClose}>
            Close
          </Button>

          <Button variant={'contained'} onClick={handleConfirm}>
            Confirm
          </Button>
        </>
      }
      additionalButtons={
        currentSchedule[selectedExportType] ? (
          <Button onClick={onRemove} variant={'outlined'} color={'secondary'}>
            Remove schedule
          </Button>
        ) : null
      }>
      <Stack spacing={3} sx={{ maxWidth: 450 }}>
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            p: 1.5,
            borderRadius: 1,
            color: 'var(--sky-500)',
            backgroundColor: 'var(--sky-050)',
          }}>
          <InfoIcon width={16} height={16} />

          <Typography
            variant={'sm-regular'}
            sx={{
              color: 'var(--slate-900)',
              lineHeight: '21px',
            }}>
            <Typography variant={'sm-medium'}>Note: </Typography>This e-mail
            report is sent at midnight (24:00) and refers to the data selected.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {Object.values(ScheduleEnum).map((item) => (
            <RadioButton
              key={item}
              value={item}
              onCheck={(schedule) =>
                setSelectedScheduleLevel(schedule as ScheduleEnum)
              }
              checked={item === selectedScheduleLevel}
            />
          ))}
        </Box>

        <BasicTab
          value={Object.values(ExportTypeEnum).indexOf(selectedExportType)}
          onChange={(index) =>
            setSelectedExportType(
              Object.values(ExportTypeEnum)[index] as ExportTypeEnum,
            )
          }
          tabLabels={Object.values(ExportTypeEnum)}
        />
      </Stack>
    </BaseModal>
  );
};

export const useScheduleModal = createModalHook<Props>((props) => (
  <ScheduleModal {...props} />
));