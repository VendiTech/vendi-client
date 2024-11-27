import { useMemo } from 'react';
import { Box } from '@mui/material';
import { ExportTypeEnum, ScheduleEnum } from '@/lib/generated/api';
import { DataTable } from '@/ui/organisms/DataTable';
import { ScheduleButton } from '@/ui/organisms/Schedule';
import { ExportButton } from '@/ui/molecules/ExportButton';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { useExportSales } from './hooks/useExportSales';
import { useScheduleSalesExport } from './hooks/useScheduleSalesExport';
import { useGetSalesSchedule } from '@/ui/organisms/ExportSalesTable/hooks/useGetSalesSchedule';
import { CurrentSchedule } from '@/ui/organisms/Schedule/types';

export const ExportSalesTable = () => {
  const { mutateAsync: exportSales } = useExportSales();
  const { mutateAsync: scheduleSalesExport } = useScheduleSalesExport();
  const {data: scheduleData} = useGetSalesSchedule() 
  
    
  const currentSchedule = scheduleData?.data.reduce((acc, curr) => ({
    ...acc,  
    [curr.export_type]: curr.schedule 
  }), {} as CurrentSchedule)
  
  return (
    <ChartCard
      title={'Raw data'}
      subtitle={'You’ve got 510 venues in total'}
      actions={
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ExportButton onExport={exportSales} />

          <ScheduleButton
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
