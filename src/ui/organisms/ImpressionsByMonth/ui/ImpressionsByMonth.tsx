import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { TooltipItem } from 'chart.js';
import { chartColors } from '@/assets/styles/variables';
import { DATE_FORMAT } from '@/lib/constants/date';
import { useGetImpressions } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { MultiLineChart } from '@/ui/atoms/MultiLineChart';
import { BaseSelect } from '@/ui/atoms/Select';
import { ChartLegend } from '@/ui/atoms/ChartLegend';
import { splitByMonth } from '../helpers/split-by-month';

export const ImpressionsByMonth = () => {
  const { data: impressions } = useGetImpressions();

  const { dateFrom, dateTo } = useGlobalFilters();

  const impressionsByMonth = useMemo(
    () => splitByMonth(impressions?.data.items ?? []),
    [impressions],
  );

  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  useEffect(() => {
    if (!dateTo || !dateFrom) {
      setSelectedMonths([impressionsByMonth[0]?.label ?? '']);

      return;
    }

    const filteredMonths = impressionsByMonth.filter(
      (item) =>
        item.month.isAfter(dayjs(dateFrom, DATE_FORMAT)) &&
        item.month.isBefore(dayjs(dateTo, DATE_FORMAT).subtract(-1, 'month')),
    );

    setSelectedMonths(filteredMonths.map((item) => item.label));
  }, [impressionsByMonth, dateTo, dateFrom]);

  const chartData = impressionsByMonth
    .map((item, i) => ({ ...item, color: chartColors[i] }))
    .filter((item) => selectedMonths.find((month) => month === item.label));

  const xLabelsCallback = (label: string | number) => {
    return (+label - 2) % 7 === 0 ? `Week ${Math.ceil(+label / 7)}` : undefined;
  };

  const tooltipTitleCallback = (tooltipItems: TooltipItem<'line'>[]) => {
    const month = tooltipItems[0].dataset.label;
    const day = tooltipItems[0].label;

    const firstDayAsDayOfWeekIndex =
      tooltipItems[0].dataset.data.findIndex(
        (item) => item !== null,
      );

    return month + ', ' + (+day - firstDayAsDayOfWeekIndex);
  }
  
  const tooltipFooterCallback = (tooltipItems: TooltipItem<'line'>[]) => {
    const dayOfWeek = +tooltipItems[0].label % 7;

    return dayjs().day(dayOfWeek).format('dddd');
  };

  return (
    <ChartCard
      title={'Impressions by month'}
      subtitle={'Lorem ipsum'}
      actions={
        <BaseSelect
          showSearch
          showInput={false}
          value={selectedMonths}
          onChange={(e) => setSelectedMonths(e.target.value as string[])}
          multiple
          options={impressionsByMonth.map((item) => ({
            key: item.label,
            value: item.label,
          }))}
        />
      }>
      <MultiLineChart
        data={chartData}
        xLabelsCallback={xLabelsCallback}
        tooltipTitleCallback={tooltipTitleCallback}
        tooltipFooterCallback={tooltipFooterCallback}
      />

      <ChartLegend
        legend={chartData.map((item) => ({
          color: item.color,
          title: item.label,
        }))}
      />
    </ChartCard>
  );
};
