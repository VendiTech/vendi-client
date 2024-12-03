import { ChartCard } from '@/ui/molecules/ChartCard';
import { DoughnutChartWithLegend } from '@/ui/molecules/DoughnutChartWithLegend';
import { useGetAccountData, useGetAvgImpressions } from '@/lib/api';

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

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetAccountData();

  const subtitle = `${user?.data.company_name ?? 'Brand partners'} impressions as a % total all accessible impressions within fleet.`;

  return (
    <ChartCard
      isError={!user || isUserError || isImpressionsError}
      isLoading={isUserLoading || isImpressionsLoading}
      title={'Total Impressions'}
      subtitle={subtitle}>
      <DoughnutChartWithLegend
        data={chartData}
        showAbsoluteValues
        isLoading={isUserLoading}
        direction={'column'}
        // TODO get values from api
        previousValue={100}
        currentValue={110}
      />
    </ChartCard>
  );
};
