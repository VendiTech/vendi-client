import { ChartCard } from '@/ui/molecules/ChartCard';
import { BarChart } from '@/ui/atoms/BarChart';
import { barChartData3 } from '@/assets/mocks/charts';
import { useEffect, useState } from 'react';

export const PurchasingHours = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 5000);
    
    return () => clearTimeout(timeout);
  }, [])
  
  
  return (
    <ChartCard
      isLoading={isLoading}
      title={'Purchasing  hours'}
      subtitle={'You made $203k in revenue this month.'}>
      <BarChart
        isLoading={isLoading}
        data={barChartData3}
        ageVerified={{
          startBar: 0,
          endBar: 2,
        }}
      />
    </ChartCard>
  );
};
