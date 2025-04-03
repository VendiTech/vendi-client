import { Box } from '@mui/material';
import { createTableProps, DataTable } from '@/ui/organisms/DataTable';
import { ScheduleButton } from '@/ui/organisms/Schedule';
import { ExportButton } from '@/ui/molecules/ExportButton';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { useExportImpressions } from './hooks/useExportImpressions';
import { useScheduleImpressionsExport } from './hooks/useScheduleImpressionsExport';
import { useGetImpressionsSchedule } from './hooks/useGetImpressionsSchedule';
import { useDeleteImpressionsSchedule } from './hooks/useDeleteImpressionsSchedule';
import { useGetRawImpressions } from './hooks/useGetRawImpresstions';
import { parseDate } from '@/lib/helpers/parse-date';

export const ExportImpressionsTable = () => {
  const { mutateAsync: exportImpressions } = useExportImpressions();
  const { mutateAsync: scheduleImpressionsExport } =
    useScheduleImpressionsExport();
  const { mutateAsync: removeSchedule } = useDeleteImpressionsSchedule();

  useGetImpressionsSchedule();

  const { data, isLoading, total, page, fetchNext } = useGetRawImpressions();

  const parsedData = (data?.data.items ?? [])
    .map((item) => ({
      ...item,
      id: String(item['Impression ID'])
    }))
    .reverse();

  const tableProps = createTableProps({
    data: parsedData,
    actionsHidden: true,
    total,
    page,
    fetchNext,
    columns: [
      { field: 'Machine Name', title: 'Venue name' },
      { field: 'Geography', title: 'Geography' },
      {
        field: 'Total Impressions',
        title: 'Total Impressions',
        comparator: (prev, curr) => +prev - +curr
      },
      { field: 'Device Number', title: 'Device Number' },
      {
        field: 'Date',
        title: 'Date',
        render: (item) => parseDate(new Date(item.Date), false)
      }
    ]
  });

  const totalVenue = new Set(parsedData.map((item) => item['Machine Name'])).size;

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
