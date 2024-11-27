import { Box } from '@mui/material';
import { DataTable } from '@/ui/organisms/DataTable';
import { ScheduleButton } from '@/ui/organisms/Schedule';
import { ExportButton } from '@/ui/molecules/ExportButton';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { useExportSales } from './hooks/useExportSales';
import { useScheduleSalesExport } from './hooks/useScheduleSalesExport';
import { useGetSalesSchedule } from '@/ui/organisms/ExportSalesTable/hooks/useGetSalesSchedule';
import { CurrentSchedule } from '@/ui/organisms/Schedule/types';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';

export const ExportSalesTable = () => {
  const { mutateAsync: exportSales } = useExportSales();
  const { mutateAsync: scheduleSalesExport } = useScheduleSalesExport();
  const { data: existingSchedules } = useGetSalesSchedule();

  const { region } = useGlobalFilters();

  const currentSchedule = existingSchedules?.data.reduce((acc, curr) => {
    const isSameRegions =
      (!region && !curr.geography_ids) ||
      (region?.length === curr.geography_ids?.length &&
        (region ?? [])
          .map((item) => +item)
          .sort()
          .every(
            (item, i) => item === [...(curr.geography_ids ?? [])].sort()[i],
          ));

    return isSameRegions
      ? {
          ...acc,
          [curr.export_type]: curr.schedule,
        }
      : acc;
  }, {} as CurrentSchedule);

  return (
    <ChartCard
      title={'Raw data'}
      subtitle={'You’ve got 510 venues in total'}
      actions={
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ExportButton onExport={exportSales} />

          <ScheduleButton
            existingSchedules={existingSchedules?.data}
            currentSchedule={currentSchedule}
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
