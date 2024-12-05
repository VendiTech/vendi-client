import { useGetAccountData, useGetAvgImpressions } from '@/lib/api';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { DoughnutChartWithLegend } from '@/ui/molecules/DoughnutChartWithLegend';

export const TotalImpressions = () => {
  const {
    data: impressions,
    isLoading: isImpressionsLoading,
    isError: isImpressionsError,
  } = useGetAvgImpressions();

  const avgImpressions = impressions?.data.avg_impressions ?? 0;
  const totalImpressions = impressions?.data.total_impressions ?? 0;

  const chartData = [
    { title: 'Average Impressions', value: avgImpressions },
    { title: 'Total Impressions', value: totalImpressions, hideAtChart: true },
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
        // TODO get values from api
        previousValue={avgImpressions}
        currentValue={avgImpressions}
      />
    </ChartCard>
  );
};
