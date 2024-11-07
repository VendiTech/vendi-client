import { ChartCard } from '@/ui/molecules/ChartCard';
import { DoughnutChartWithLegend } from '@/ui/molecules/DoughnutChartWithLegend';

const data = [
  { title: 'Nordic Impressions', value: 2310000 },
  { title: 'Total Impressions', value: 9230000, hideAtChart: true },
];

export const TotalImpressions = () => {
  return (
    <ChartCard
      title={'Total Impressions'}
      subtitle={
        'JTI impressions as a % total all accessible impressions within fleet.'
      }>
      <DoughnutChartWithLegend
        data={data}
        growthPercent={2.9}
        showAbsoluteValues
        isLoading={false}
        direction={'column'}
      />
    </ChartCard>
  );
};
