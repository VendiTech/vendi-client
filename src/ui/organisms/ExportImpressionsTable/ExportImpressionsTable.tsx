import { Box } from '@mui/material';
import { createTableProps, DataTable, useSort } from '@/ui/organisms/DataTable';
import { ScheduleButton } from '@/ui/organisms/Schedule';
import { ExportButton } from '@/ui/molecules/ExportButton';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { useExportImpressions } from './hooks/useExportImpressions';
import { useScheduleImpressionsExport } from './hooks/useScheduleImpressionsExport';
import { useGetImpressionsSchedule } from './hooks/useGetImpressionsSchedule';
import { useDeleteImpressionsSchedule } from './hooks/useDeleteImpressionsSchedule';
import { useGetRawImpressions } from './hooks/useGetRawImpresstions';

export const ExportImpressionsTable = () => {
  const { orderBy, orderDirection, getOnSort } = useSort();

  const { mutateAsync: exportImpressions } = useExportImpressions({
    orderBy,
    orderDirection,
  });
  const { mutateAsync: scheduleImpressionsExport } =
    useScheduleImpressionsExport();
  const { mutateAsync: removeSchedule } = useDeleteImpressionsSchedule();

  useGetImpressionsSchedule();

  const { data, isLoading, total, page, fetchNext } = useGetRawImpressions({
    orderBy,
    orderDirection,
  });

  const parsedData = (data?.data.items ?? []).map((item) => ({
    ...item,
    id: String(item['Impression ID']),
  }));

  const tableProps = createTableProps({
    data: parsedData,
    actionsHidden: true,
    total,
    page,
    fetchNext,
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
        field: 'Total Impressions',
        title: 'Total Impressions',
        onSort: getOnSort('impressions'),
      },
      {
        field: 'Device Number',
        title: 'Device Number',
        onSort: getOnSort('device_number'),
      },
      {
        field: 'Date',
        title: 'Date',
        onSort: getOnSort('date'),
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
          <ExportButton onExport={exportImpressions} />

          <ScheduleButton
            useExistingSchedules={useGetImpressionsSchedule}
            createSchedule={scheduleImpressionsExport}
            removeSchedule={removeSchedule}
          />
        </Box>
      }>
      <DataTable {...tableProps} />
    </ChartCard>
  );
};
