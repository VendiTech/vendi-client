import { createTableProps, DataTable } from '@/ui/organisms/DataTable';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { TableGrowthPercent } from '@/ui/atoms/GrowthPercent';
import { useGetMonthOnMonthSummary } from '../api/useGetMonthOnMonthSummary';
import { splitByMonth } from '../helpers/splitByMonth';

export const MonthOnMonthSummary = () => {
  const { data, isLoading, isError } = useGetMonthOnMonthSummary();

  const tableData = splitByMonth(data?.data.items ?? []);

  const tableColumns = Object.keys(tableData[0]);

  const tableProps = createTableProps({
    data: tableData,
    actionsHidden: true,
    disableMinHeight: true,
    // @ts-expect-error dynamic field names
    columns: tableColumns.map((key, i) => ({
      title: i > 0 ? key : '',
      field: key,
      render: (item) => {
        if (i === 0) return item[key];

        if (Number.isNaN(item[key])) return 'N/A';

        if (item.id.includes('%')) {
          return <TableGrowthPercent showPercent percent={item[key]} />;
        }

        if (i < 2) return item[key];

        return (
          <TableGrowthPercent
            showPercent={false}
            displayValue={item[key]}
            percent={
              Number(item[tableColumns[i]]) - Number(item[tableColumns[i - 1]])
            }
          />
        );
      },
    })),
  });

  return (
    <ChartCard
      title={'Month on month summary'}
      isLoading={isLoading}
      isError={isError}>
      <DataTable {...tableProps} />
    </ChartCard>
  );
};
