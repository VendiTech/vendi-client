import { Box } from '@mui/material';
import { createTableProps, DataTable } from '@/ui/organisms/DataTable';
import { ScheduleButton } from '@/ui/organisms/Schedule';
import { ExportButton } from '@/ui/molecules/ExportButton';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { useExportSales } from './hooks/useExportSales';
import { useScheduleSalesExport } from './hooks/useScheduleSalesExport';
import { useGetSalesSchedule } from './hooks/useGetSalesSchedule';
import { useDeleteSalesSchedule } from './hooks/useDeleteSalesSchedule';
import { useGetRawSales } from './hooks/useGetRawSales';
import { parseDate } from '@/lib/helpers/parse-date';

export const ExportSalesTable = () => {
  const { mutateAsync: exportSales } = useExportSales();
  const { mutateAsync: scheduleSalesExport } = useScheduleSalesExport();
  const { mutateAsync: removeSchedule } = useDeleteSalesSchedule();

  useGetSalesSchedule();

  const { data, isLoading, fetchNext, page, total } = useGetRawSales();

  const parsedData = (data?.data.items ?? [])
    .map((item) => ({
      ...item,
      id: String(item['Sale ID']),
      Date: `${item['Date']}: ${item['Time']}`,
    }))
    .reverse();

  const tableProps = createTableProps({
    data: parsedData,
    actionsHidden: true,
    fetchNext,
    page,
    total,
    columns: [
      { field: 'Machine Name', title: 'Venue name' },
      { field: 'Geography', title: 'Geography' },
      { field: 'Product sold', title: 'Product sold' },
      { field: 'Product ID', title: 'Product ID' },
      {
        field: 'Date',
        title: 'Date',
        render: (item) => parseDate(new Date(item['Date'])),
      },
    ],
  });

  const totalVenue = new Set(parsedData.map((item) => item['Machine Name']))
    .size;

  return (
    <ChartCard
      title={'Raw data'}
      subtitle={`You’ve got ${totalVenue} venue in total`}
      isLoading={isLoading}
      actions={
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ExportButton onExport={exportSales} />

          <ScheduleButton
            useExistingSchedules={useGetSalesSchedule}
            createSchedule={scheduleSalesExport}
            removeSchedule={removeSchedule}
          />
        </Box>
      }>
      <DataTable {...tableProps} />
    </ChartCard>
  );
};
