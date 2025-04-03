import { ChartCard } from '@/ui/molecules/ChartCard';
import { BarChart } from '@/ui/atoms/BarChart';
import { useGetInfiniteImpressionsByVenue } from '@/lib/api/hooks/impressions/useGetInfiniteImpressionsByVenue';

export const ImpressionsByVenue = () => {
  const { data, isLoading, isError, fetchNextPage, total } =
    useGetInfiniteImpressionsByVenue();

  const chartData = data.map((item) => ({
    label: item.venue,
    value: item.impressions,
  }));

  return (
    <ChartCard
      title={'Impressions by venue over time'}
      subtitle={`You have impressions in ${total} venue`}
      isLoading={isLoading}
      isError={!chartData.length || isError}>
      <BarChart
        fetchNext={fetchNextPage}
        data={chartData}
        isLoading={isLoading}
      />
    </ChartCard>
  );
};
