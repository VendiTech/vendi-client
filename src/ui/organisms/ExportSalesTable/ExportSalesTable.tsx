import { Box } from '@mui/material';
import { DataTable } from '@/ui/organisms/DataTable';
import { ScheduleButton } from '@/ui/organisms/Schedule';
import { ExportButton } from '@/ui/molecules/ExportButton';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { useExportSales } from './hooks/useExportSales';
import { useScheduleSalesExport } from './hooks/useScheduleSalesExport';

export const ExportSalesTable = () => {
  const { mutateAsync: exportSales } = useExportSales();
  const { mutateAsync: scheduleSalesExport } = useScheduleSalesExport();

  return (
    <ChartCard
      title={'Raw data'}
      subtitle={'You’ve got 510 venues in total'}
      actions={
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ExportButton onExport={exportSales} />

          <ScheduleButton
            currentSchedule={'Bi-Annually'}
            createSchedule={scheduleSalesExport}
            editSchedule={scheduleSalesExport}
            removeSchedule={() => Promise.resolve()}
          />
        </Box>
      }>
      <DataTable columns={[]} data={[]} />
    </ChartCard>
  );
};
