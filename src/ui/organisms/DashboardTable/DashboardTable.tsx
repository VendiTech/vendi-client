import { dashboardOverview } from '@/assets/mocks/dashboard-overview';
import { dashboardSales } from '@/assets/mocks/dashboard-sales';
import ArrowIcon from '@/assets/icons/Arrow.svg';
import { parseDate } from '@/lib/helpers/parse-date';
import { createTableProps, TabsTable } from '@/ui/organisms/DataTable';
import { GrowthPercent } from '@/ui/atoms/GrowthPercent';
import { Box, Typography } from '@mui/material';

export const DashboardTable = () => {
  const overviewData = dashboardOverview.map((item) => ({
    id: item.item1,
    ...item,
  }));
  const salesData = dashboardSales.map((item) => ({ id: item.item1, ...item }));

  const overviewTableProps = createTableProps({
    data: overviewData,
    columns: [
      { field: 'item1', title: 'Item1' },
      { field: 'item2', title: 'Item2' },
      {
        field: 'number',
        title: 'Number',
        render: (item) => (
          <GrowthPercent
            sx={{
              gap: 1,
              minWidth: 52,
              fontWeight: 'inherit',
            }}
            percent={item.number}
            colorizeText={false}
            arrowPosition={'right'}
            showPercent={false}
          />
        ),
      },
      { field: 'date', title: 'Date', render: (item) => parseDate(item.date) },
    ],
  });

  const salesTableProps = createTableProps({
    data: salesData,
    columns: [
      { field: 'item1', title: 'Item1' },
      { field: 'item2', title: 'Item2' },
      { field: 'number', title: 'Number' },
      { field: 'date', title: 'Date' },
    ],
  });

  return (
    <TabsTable
      tabs={[
        { title: 'Overview', tableProps: overviewTableProps },
        { title: 'Advertising', tableProps: overviewTableProps },
        { title: 'Sales', tableProps: salesTableProps },
      ]}
    />
  );
};
