import { useState } from 'react';
import { impressionByMonth } from '@/assets/mocks/impressions-by-month';
import { colors } from '@/assets/styles/variables';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { MultiLineChart } from '@/ui/atoms/MultiLineChart';
import { BaseSelect } from '@/ui/atoms/Select';
import { ChartLegend } from '@/ui/atoms/ChartLegend';

const chartColors = [
  colors.sky500,
  colors.cyan400,
  colors.pink300,
  colors.peach500,
  colors.purple400,
  colors.yellow200,
  colors.green500,
  colors.red500,
  colors.purple500,
  colors.sky400,
  colors.slate500,
  colors.gradientStartBad,
];

export const ImpressionsByMonth = () => {
  const [selectedMonths, setSelectedMonths] = useState(
    impressionByMonth.map((item) => item.label),
  );

  const xLabelsCallback = (value: number) => {
    if (value % 7 !== 0) return;

    return 'Week ' + Math.round(value / 7 + 1);
  };

  const chartData = impressionByMonth
    .map((item, i) => ({ ...item, color: chartColors[i] }))
    .filter((item) => selectedMonths.find((month) => month === item.label));

  return (
    <ChartCard
      title={'Impressions by month'}
      subtitle={'Lorem ipsum'}
      actions={
        <BaseSelect
          showInput={false}
          value={selectedMonths}
          onChange={(e) => setSelectedMonths(e.target.value)}
          multiple
          options={impressionByMonth.map((item) => ({
            key: item.label,
            value: item.label,
          }))}
        />
      }>
      <MultiLineChart
        data={chartData}
        xLabelsCallback={xLabelsCallback}
        sx={{ height: '100%' }}
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
