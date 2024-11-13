import { useEffect, useMemo, useState } from 'react';
import { chartColors } from '@/assets/styles/variables';
import { useGetImpressions } from '@/lib/api';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { MultiLineChart } from '@/ui/atoms/MultiLineChart';
import { BaseSelect } from '@/ui/atoms/Select';
import { ChartLegend } from '@/ui/atoms/ChartLegend';
import { splitByMonth } from '../helpers/split-by-month';

export const ImpressionsByMonth = () => {
  const { data: impressions } = useGetImpressions();

  const impressionsByMonth = useMemo(
    () => splitByMonth(impressions?.data.items ?? []),
    [impressions],
  );

  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  useEffect(() => {
    setSelectedMonths(impressionsByMonth.map((item) => item.label));
  }, [impressionsByMonth]);

  const xLabelsCallback = (value: number | string) => {
    if (+value % 7 !== 0) return;

    return 'Week ' + Math.round(+value / 7 + 1);
  };

  const chartData = impressionsByMonth
    .map((item, i) => ({ ...item, color: chartColors[i] }))
    .filter((item) => selectedMonths.find((month) => month === item.label));

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
      <MultiLineChart data={chartData} xLabelsCallback={xLabelsCallback} />

      <ChartLegend
        legend={chartData.map((item) => ({
          color: item.color,
          title: item.label,
        }))}
      />
    </ChartCard>
  );
};
