import { Box } from '@mui/material';
import { DataTable } from '@/ui/organisms/DataTable';
import { ScheduleButton } from '@/ui/organisms/Schedule';
import { ExportButton } from '@/ui/molecules/ExportButton';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { useExportImpressions } from './hooks/useExportImpressions';
import { useScheduleImpressionsExport } from './hooks/useScheduleImpressionsExport';
import { useGetImpressionsSchedule } from './hooks/useGetImpressionsSchedule';
import { useDeleteImpressionsSchedule } from './hooks/useDeleteImpressionsSchedule';

export const ExportImpressionsTable = () => {
  const { mutateAsync: exportImpressions } = useExportImpressions();
  const { mutateAsync: scheduleImpressionsExport } =
    useScheduleImpressionsExport();
  const { mutateAsync: removeSchedule } = useDeleteImpressionsSchedule();
  
  useGetImpressionsSchedule()

  return (
    <ChartCard
      title={'Raw data'}
      subtitle={'You’ve got 510 venues in total'}
      actions={
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ExportButton onExport={exportImpressions} />

          <ScheduleButton
            useExistingSchedules={useGetImpressionsSchedule}
            createSchedule={scheduleImpressionsExport}
            removeSchedule={removeSchedule}
          />
        </Box>
      }>
      <DataTable columns={[]} data={[]} />
    </ChartCard>
  );
};
