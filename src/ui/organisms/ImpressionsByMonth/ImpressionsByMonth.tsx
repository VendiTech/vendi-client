import { useState } from 'react';
import { impressionByMonth } from '@/assets/mocks/impressions-by-month';
import { chartColors } from '@/assets/styles/variables';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { MultiLineChart } from '@/ui/atoms/MultiLineChart';
import { BaseSelect } from '@/ui/atoms/Select';
import { ChartLegend } from '@/ui/atoms/ChartLegend';

export const ImpressionsByMonth = () => {
  const [selectedMonths, setSelectedMonths] = useState(
    impressionByMonth.map((item) => item.label),
  );

  const xLabelsCallback = (value: number | string) => {
    if (+value % 7 !== 0) return;

    return 'Week ' + Math.round(+value / 7 + 1);
  };

  const chartData = impressionByMonth
    .map((item, i) => ({ ...item, color: chartColors[i] }))
    .filter((item) => selectedMonths.find((month) => month === item.label));

  return (
    <ChartCard
      title={'Impressions by week'}
      subtitle={'Lorem ipsum'}
      actions={
        <BaseSelect
          showSearch
          showInput={false}
          value={selectedMonths}
          onChange={(e) => setSelectedMonths(e.target.value as string[])}
          multiple
          options={impressionByMonth.map((item) => ({
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
