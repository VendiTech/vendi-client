import { useGetUnitsSold } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { parseNumber } from '@/lib/helpers/parse-number';
import { getDisplayDatesInterval } from '@/lib/helpers/get-display-dates-interval';
import { getDisplayTimeFrame } from '@/lib/helpers/getDisplayTimeFrame';
import { DateRangeEnum } from '@/lib/generated/api';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { BarChart } from '@/ui/atoms/BarChart';
import { getUnitsSoldTimeFrame } from '../helpers/get-units-sold-time-frame';

export const UnitsSold = () => {
  const { dateFrom, dateTo } = useGlobalFilters();

  const timeFrame = getUnitsSoldTimeFrame(dateFrom, dateTo);

  const { data, isLoading, isError } = useGetUnitsSold(timeFrame);

  const items = data?.data.items ?? [];

  const chartData = items.map((item) => ({
    label: getDisplayTimeFrame(item.time_frame, timeFrame),
    value: item.units,
  }));

  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);

  const title =
    timeFrame === DateRangeEnum.Day
      ? 'Units sold'
      : `Units sold by ${timeFrame}`;
  const subtitle = `You made $${total} in revenue ${getDisplayDatesInterval(dateFrom, dateTo)}`;

  return (
    <ChartCard
      isLoading={isLoading}
      isError={isError || !total}
      title={title}
      subtitle={subtitle}>
      <BarChart
        data={chartData}
        yLabelsCallback={(labelValue) => `$${parseNumber(+labelValue, true)}`}
        isLoading={isLoading}
      />
    </ChartCard>
  );
};
