import { createTableProps, DataTable } from '@/ui/organisms/DataTable';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { useGetMonthOnMonthSummary } from '../api/useGetMonthOnMonthSummary';
import { splitByMonth } from '../helpers/splitByMonth';

export const MonthOnMonthSummary = () => {
  const { data, isLoading, isError } = useGetMonthOnMonthSummary();

  const parsedData = splitByMonth(data?.data.items ?? [])
  
  // const tableProps = createTableProps({
  //   data: data?.data.items
  // });

  return (
    <ChartCard
      title={'Month on month summary'}
      isLoading={isLoading}
      isError={isError}>
      {/*<DataTable />*/}
    </ChartCard>
  );
};
