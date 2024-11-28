import { Box } from '@mui/material';
import { DataTable } from '@/ui/organisms/DataTable';
import { ScheduleButton } from '@/ui/organisms/Schedule';
import { ExportButton } from '@/ui/molecules/ExportButton';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { useExportSales } from './hooks/useExportSales';
import { useScheduleSalesExport } from './hooks/useScheduleSalesExport';
import { useGetSalesSchedule } from './hooks/useGetSalesSchedule';
import { useDeleteSalesSchedule } from './hooks/useDeleteSalesSchedule';

export const ExportSalesTable = () => {
  const { mutateAsync: exportSales } = useExportSales();
  const { mutateAsync: scheduleSalesExport } = useScheduleSalesExport();
  const { mutateAsync: removeSchedule } = useDeleteSalesSchedule();
  const { data: existingSchedules } = useGetSalesSchedule();

  return (
    <ChartCard
      title={'Raw data'}
      subtitle={'You’ve got 510 venues in total'}
      actions={
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ExportButton onExport={exportSales} />

          <ScheduleButton
            existingSchedules={existingSchedules?.data}
            createSchedule={scheduleSalesExport}
            removeSchedule={removeSchedule}
          />
        </Box>
      }>
      <DataTable columns={[]} data={[]} />
    </ChartCard>
  );
};
