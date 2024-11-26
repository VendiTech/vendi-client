import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { ExportTypeEnum, ScheduleEnum } from '@/lib/generated/api';
import InfoIcon from '@/assets/icons/Info.svg';
import { BaseModal, ModalProps } from '@/ui/molecules/BaseModal';
import { Button } from '@/ui/atoms/Button';
import { BasicTab } from '@/ui/atoms/Tabs';
import { RadioButton } from './RadioButton';

export type ScheduleModalProps = {
  onRemove?: () => void;
  onConfirm: (schedule: ScheduleEnum, exportType: ExportTypeEnum) => void;
  currentScheduleLevel?: ScheduleEnum;
  currentExportType?: ExportTypeEnum;
} & Omit<ModalProps, 'onConfirm'>;

export const BaseScheduleModal = (props: ScheduleModalProps) => {
  const {
    currentScheduleLevel,
    currentExportType,
    onClose,
    onConfirm,
    onRemove,
  } = props;

  const [selectedScheduleLevel, setSelectedScheduleLevel] =
    useState<ScheduleEnum>(currentScheduleLevel ?? ScheduleEnum.Monthly);
  
  const [selectedExportType, setSelectedExportType] = useState(
    currentExportType ?? ExportTypeEnum.Csv,
  );

  const handleConfirm = () => {
    onConfirm(selectedScheduleLevel, selectedExportType);
    onClose();
  };

  return (
    <BaseModal
      wrapperProps={{}}
      onClose={onClose}
      title={'Schedule this report'}
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
        onRemove ? (
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
