import { useState } from 'react';
import { colors } from '@/assets/styles/variables';
import { useGetAvgSalesPerRange, useGetImpressionsPerRange } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { getTimeFrame } from '@/lib/helpers/get-time-frame';
import { getDisplayTimeFrame } from '@/lib/helpers/getDisplayTimeFrame';
import { getDisplayDatesInterval } from '@/lib/helpers/get-display-dates-interval';
import { parseNumber } from '@/lib/helpers/parse-number';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { BarChart } from '@/ui/atoms/BarChart';
import { ChartLegend } from '@/ui/atoms/ChartLegend';
import { BaseSelect } from '@/ui/atoms/Select';

const SALES = 'Sales';
const IMPRESSIONS = 'Impressions';

export const SalesVsImpressions = () => {
  const {
    data: salesData,
    isLoading: isSalesLoading,
    isError: isSalesError,
  } = useGetAvgSalesPerRange();
  const {
    data: impressionsData,
    isLoading: isImpressionsLoading,
    isError: isImpressionsError,
  } = useGetImpressionsPerRange();

  const [selectedItems, setSelectedItems] = useState([SALES, IMPRESSIONS]);

  const sales = salesData?.data.items ?? [];
  const impressions = impressionsData?.data.items ?? [];

  const { dateFrom, dateTo } = useGlobalFilters();
  const timeFrame = getTimeFrame(dateFrom, dateTo);

  const chartData = sales.map((item, i) => ({
    label: getDisplayTimeFrame(item.time_frame, timeFrame),
    value: item.quantity,
    lineValue: impressions[i]?.impressions,
  }));

  const totalSales = chartData.reduce((acc, curr) => acc + curr.value, 0);
  const totalImpressions = chartData.reduce(
    (acc, curr) => acc + curr.lineValue,
    0,
  );

  const subtitle = `You have ${parseNumber(totalSales, true)} sales and ${parseNumber(totalImpressions, true)}
   impressions ${getDisplayDatesInterval(dateFrom, dateTo)}`;

  return (
    <ChartCard
      title={`Sales vs Impressions by ${timeFrame}`}
      subtitle={subtitle}
      isError={
        isSalesError || isImpressionsError || !totalSales || !totalImpressions
      }
      actions={
        <BaseSelect
          showInput={false}
          value={selectedItems}
          onChange={(e) => setSelectedItems(e.target.value as string[])}
          multiple
          options={[
            { key: SALES, value: SALES },
            { key: IMPRESSIONS, value: IMPRESSIONS },
          ]}
        />
      }>
      <BarChart
        showBars={selectedItems.includes(SALES)}
        showLine={selectedItems.includes(IMPRESSIONS)}
        withLine
        data={chartData}
        isLoading={isSalesLoading || isImpressionsLoading}
      />

      <ChartLegend legend={[{ title: 'Impressions', color: colors.pink300 }]} />
    </ChartCard>
  );
};
