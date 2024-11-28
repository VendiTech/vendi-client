import { ChartCard } from '@/ui/molecules/ChartCard';
import { DoughnutChartWithLegend } from '@/ui/molecules/DoughnutChartWithLegend';
import { useGetAccountData } from '@/lib/api';

const data = [
  { title: 'Nordic Impressions', value: 2310000 },
  { title: 'Total Impressions', value: 9230000, hideAtChart: true },
];

export const TotalImpressions = () => {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetAccountData();

  const subtitle = `${user?.data.company_name ?? 'Brand partners'} impressions as a % total all accessible impressions within fleet.`;

  return (
    <ChartCard
      isError={!user || isUserError}
      isLoading={isUserLoading}
      title={'Total Impressions'}
      subtitle={subtitle}>
      <DoughnutChartWithLegend
        data={data}
        growthPercent={2.9}
        showAbsoluteValues
        isLoading={isUserLoading}
        direction={'column'}
      />
    </ChartCard>
  );
};
