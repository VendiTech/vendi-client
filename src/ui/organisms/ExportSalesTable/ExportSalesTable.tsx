import { Box } from '@mui/material';
import { createTableProps, DataTable, useSort } from '@/ui/organisms/DataTable';
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
  const { orderBy, orderDirection, getOnSort } = useSort();

  const { mutateAsync: exportSales } = useExportSales({
    orderBy,
    orderDirection,
  });
  const { mutateAsync: scheduleSalesExport } = useScheduleSalesExport();
  const { mutateAsync: removeSchedule } = useDeleteSalesSchedule();

  useGetSalesSchedule();

  const { data, isLoading, fetchNext, page, total } = useGetRawSales({
    orderBy,
    orderDirection,
  });

  const parsedData = (data?.data.items ?? []).map((item) => ({
    ...item,
    id: String(item['Sale ID']),
    Date: `${item['Date']}: ${item['Time']}`,
  }));

  const tableProps = createTableProps({
    data: parsedData,
    actionsHidden: true,
    fetchNext,
    page,
    total,
    columns: [
      {
        field: 'Machine Name',
        title: 'Venue name',
        onSort: getOnSort('venue'),
      },
      {
        field: 'Geography',
        title: 'Geography',
        onSort: getOnSort('geography'),
      },
      {
        field: 'Product sold',
        title: 'Product sold',
        onSort: getOnSort('product'),
      },
      {
        field: 'Product ID',
        title: 'Product ID',
        onSort: getOnSort('product_id'),
      },
      {
        field: 'Date',
        title: 'Date',
        onSort: getOnSort('date'),
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
