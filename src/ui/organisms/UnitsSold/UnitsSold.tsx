import { useGetUnitsSold } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { parseNumber } from '@/lib/helpers/parse-number';
import { getDisplayDatesInterval } from '@/lib/helpers/get-display-dates-interval';
import { ChartCard } from '@/ui/molecules/ChartCard';
import {
  Filter,
  SalesAdvertisingFilter,
  SalesAdvertisingFilterProvider,
  useSalesAdvertisingFilterContext,
} from '@/ui/molecules/SalesAdvertisingFilter';
import { BarChart } from '@/ui/atoms/BarChart';
import dayjs from 'dayjs';

const UnitsSoldInner = () => {
  const { dateFrom, dateTo } = useGlobalFilters();
  const { filter } = useSalesAdvertisingFilterContext();

  const { data, isLoading, isError } = useGetUnitsSold();

  const items = data?.data.items ?? [];

  const chartData = items.map((item) => ({
    label: dayjs(item.time_frame).format('MMMM'),
    value: item.units,
  }));

  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);

  const subtitle = `You made $${total} in revenue ${getDisplayDatesInterval(dateFrom, dateTo)}`;

  return (
    <ChartCard
      isLoading={isLoading}
      isError={isError}
      title={'Units sold'}
      subtitle={subtitle}
      actions={<SalesAdvertisingFilter />}>
      <BarChart
        data={filter === Filter.Sales ? chartData : chartData}
        yLabelsCallback={(labelValue) => `$${parseNumber(+labelValue, true)}`}
        isLoading={false}
      />
    </ChartCard>
  );
};

export const UnitsSold = () => {
  return (
    <SalesAdvertisingFilterProvider>
      <UnitsSoldInner />
    </SalesAdvertisingFilterProvider>
  );
};
