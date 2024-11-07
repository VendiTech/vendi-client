import { ChartCard } from '@/ui/molecules/ChartCard';
import { LineChart } from '@/ui/atoms/LineChart';

const data = [420000, 480000, 310000, 460000];
const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

export const ImpressionsByWeek = () => {
  return (
    <ChartCard
      title={'Impressions by week'}
      subtitle={'Total impressions on a week by week basis compared.'}>
      <LineChart
        data={data}
        labels={labels}
        color={'accent'}
        showGradient={false}
        showScales
        tooltipEnabled
      />
    </ChartCard>
  );
};
