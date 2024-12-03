import { ChartCard } from '@/ui/molecules/ChartCard';
import { BarChart } from '@/ui/atoms/BarChart';
import { useGetImpressionsByVenue } from '../api/useGetImpressionsByVenue';

export const ImpressionsByVenue = () => {
  const { data, isLoading, isError } = useGetImpressionsByVenue();

  const chartData = (data?.data.items ?? []).map((item) => ({
    label: item.venue,
    value: item.impressions
  }));

  return (
    <ChartCard
      title={'Impressions by venue over time'}
      subtitle={`You have impressions in ${chartData.length} venue`}
      isLoading={isLoading}
      isError={!chartData.length || isError}>
      <BarChart data={chartData} isLoading={isLoading} />
    </ChartCard>
  );
};
