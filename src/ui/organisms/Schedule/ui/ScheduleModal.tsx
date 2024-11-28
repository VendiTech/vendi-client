import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import { UseQueryResult } from '@tanstack/react-query';
import { Box, Stack, Typography } from '@mui/material';
import {
  ExportTypeEnum,
  ScheduleEnum,
  UserExistingSchedulesSchema,
} from '@/lib/generated/api';
import { createModalHook } from '@/lib/services/Modals';
import { useGetGeographies } from '@/lib/api';
import InfoIcon from '@/assets/icons/Info.svg';
import { ScheduleParams } from '@/ui/organisms/Schedule/types';
import { createTableProps, DataTable } from '@/ui/organisms/DataTable';
import { BaseModal, ModalProps } from '@/ui/molecules/BaseModal';
import { Button } from '@/ui/atoms/Button';
import { BasicTab } from '@/ui/atoms/Tabs';
import { RadioButton } from './RadioButton';

type Props = {
  onRemove: (id: string) => void;
  onCreate: (params: ScheduleParams) => void;
  useExistingSchedules: () => UseQueryResult<
    AxiosResponse<UserExistingSchedulesSchema[]>
  >;
} & Omit<ModalProps, 'onConfirm'>;

export const ScheduleModal = (props: Props) => {
  const { onClose, onCreate, onRemove, useExistingSchedules } = props;

  const { data: geographies } = useGetGeographies();
  const { data: existingSchedules } = useExistingSchedules();

  const [selectedExportType, setSelectedExportType] = useState<ExportTypeEnum>(
    ExportTypeEnum.Csv,
  );

  const [selectedScheduleLevel, setSelectedScheduleLevel] =
    useState<ScheduleEnum>(ScheduleEnum.Monthly);

  const handleConfirm = () => {
    const scheduleParams = {
      schedule: selectedScheduleLevel,
      exportType: selectedExportType,
    };

    onCreate(scheduleParams);

    onClose();
  };

  const parsedSchedules = (existingSchedules?.data ?? [])
    .filter((item) => item.export_type === selectedExportType)
    .map((item) => ({
      id: item.task_id,
      type: item.export_type,
      schedule: item.schedule,
      regions: item.geography_ids?.map(
        (regionId) =>
          geographies?.data.items.find((region) => region.id === regionId)
            ?.name ?? '',
      ) ?? ['United Kingdom'],
    }));

  const tableProps = createTableProps({
    data: parsedSchedules,
    columns: [
      { field: 'schedule', title: 'Schedule' },
      {
        field: 'regions',
        title: 'Geographies',
        render: (item) => item.regions?.join(', '),
      },
    ],
    menuActions: [{ name: 'Remove', fn: (id) => onRemove(id), critical: true }],
  });

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

      {parsedSchedules.length ? <DataTable {...tableProps} /> : null}
    </BaseModal>
  );
};

export const useScheduleModal = createModalHook<Props>((props) => (
  <ScheduleModal {...props} />
));
