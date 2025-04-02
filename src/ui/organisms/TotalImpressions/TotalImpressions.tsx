import { useGetAvgImpressions } from '@/lib/api';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { DoughnutChartWithLegend } from '@/ui/molecules/DoughnutChartWithLegend';

export const TotalImpressions = () => {
  const {
    data: impressions,
    isLoading: isImpressionsLoading,
    isError: isImpressionsError,
  } = useGetAvgImpressions();

  const avgImpressions = impressions?.data.avg_impressions ?? 0;

  const currentImpressions = impressions?.data.impressions ?? 0;
  const previousImpressions = impressions?.data.previous_month_statistic ?? 0;

  const chartData = [
    { title: 'Average Impressions', value: avgImpressions },
    {
      title: 'Total Impressions',
      value: currentImpressions,
      hideAtChart: true,
    },
  ];

  return (
    <ChartCard
      isError={isImpressionsError}
      isLoading={isImpressionsLoading}
      title={'Total Impressions'}>
      <DoughnutChartWithLegend
        data={chartData}
        showAbsoluteValues
        isLoading={isImpressionsLoading}
        direction={'column'}
        previousValue={previousImpressions}
        currentValue={currentImpressions}
      />
    </ChartCard>
  );
};
