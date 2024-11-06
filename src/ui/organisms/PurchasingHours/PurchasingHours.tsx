import { ChartCard } from '@/ui/molecules/ChartCard';
import { BarChart } from '@/ui/atoms/BarChart';
import { barChartData3 } from '@/assets/mocks/charts';

export const PurchasingHours = () => {
  return (
    <ChartCard
      title={'Purchasing  hours'}
      subtitle={'You made $203k in revenue this month.'}>
      <BarChart
        data={barChartData3}
        ageVerified={{
          startBar: 0,
          endBar: 2,
        }}
      />
    </ChartCard>
  );
};
