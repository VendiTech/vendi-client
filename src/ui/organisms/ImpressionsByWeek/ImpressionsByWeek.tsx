import { ChartCard } from '@/ui/molecules/ChartCard';
import { LineChart } from '@/ui/atoms/LineChart';
import { useGetImpressions } from '@/lib/api';

export const ImpressionsByWeek = () => {
  const {data, isLoading, isError} = useGetImpressions()
  
  const items = [...(data?.data.items ?? [])].reverse()
  
  const chartData = items.map((item) => +item.total_impressions)
  const chartLabels =  items.map((item) => item.date)
  
  return (
    <ChartCard
      title={'Impressions by week'}
      subtitle={'Total impressions on a week by week basis compared.'}
      isError={isError}
    >
      <LineChart
        data={chartData}
        isLoading={isLoading}
        labels={chartLabels}
        color={'accent'}
        showGradient={false}
        showScales
        tooltipEnabled
      />
    </ChartCard>
  );
};
