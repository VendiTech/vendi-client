import { useGetSalesPerTimePeriod } from '@/lib/api';
import { getDisplayDatesInterval } from '@/lib/helpers/get-display-dates-interval';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { BarChart } from '@/ui/atoms/BarChart';

export const PurchasingHours = () => {
  const { data, isLoading, isError } = useGetSalesPerTimePeriod();

  const { dateFrom, dateTo } = useGlobalFilters();

  const chartData =
    data?.data.map((item) => ({
      label: item.time_period,
      value: item.revenue,
    })) ?? [];

  const total =
    Math.round(chartData.reduce((acc, curr) => acc + curr.value, 0) * 100) /
    100;

  const subtitle = `You made $${total} in revenue ${getDisplayDatesInterval(dateFrom, dateTo)}`;

  return (
    <ChartCard
      isLoading={isLoading}
      isError={isError || !total}
      title={'Purchasing  hours'}
      subtitle={subtitle}>
      <BarChart
        isLoading={isLoading}
        data={chartData}
        ageVerified={{
          startBar: 0,
          endBar: 2,
        }}
      />
    </ChartCard>
  );
};
