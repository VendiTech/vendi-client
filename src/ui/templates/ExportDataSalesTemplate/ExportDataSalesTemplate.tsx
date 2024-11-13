import { Box, Stack } from '@mui/material';
import { GlobalFilters } from '@/lib/services/GlobalFilters';
import ExportIcon from '@/assets/icons/Export.svg';
import ScheduleIcon from '@/assets/icons/CalendarEmpty.svg';
import { useCreateScheduleModal } from '@/ui/organisms/Modals';
import { QuantityOfProductsPurchased } from '@/ui/organisms/QuantityOfProductsPurchased';
import { AvgSalesPerMachines } from '@/ui/organisms/AvgSalesPerMachines';
import { DataTable } from '@/ui/organisms/DataTable';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { MenuButton } from '@/ui/molecules/MenuButton';
import { Flexbox } from '@/ui/atoms/Flexbox';
import { Button } from '@/ui/atoms/Button';

export const ExportDataSalesTemplate = () => {
  const [openCreateScheduleModal] = useCreateScheduleModal();

  const createSchedule = () =>
    openCreateScheduleModal({
      onConfirm: console.log,
    });

  return (
    <Stack spacing={2}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <GlobalFilters
          showAdvertisingIdFilter
          showProductFilter
          showClearButton
        />
      </Box>

      <Flexbox>
        <QuantityOfProductsPurchased />

        <AvgSalesPerMachines />
      </Flexbox>

      <ChartCard
        title={'Raw data'}
        subtitle={'You’ve got 510 venues in total'}
        actions={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <MenuButton
              variant={'outlined'}
              size={'small'}
              endIcon={null}
              startIcon={<ExportIcon />}
              actions={[
                {
                  name: 'CSV',
                  fn: () => {},
                },
                {
                  name: 'Excel',
                  fn: () => {},
                },
              ]}>
              Export data
            </MenuButton>

            <Button
              variant={'outlined'}
              size={'small'}
              startIcon={<ScheduleIcon />}
              onClick={createSchedule}>
              Report scheduler
            </Button>
          </Box>
        }>
        <DataTable columns={[]} data={[]} />
      </ChartCard>
    </Stack>
  );
};
