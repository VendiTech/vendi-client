import { BarChart } from '@/ui/atoms/BarChart';
import { ChartCard } from '@/ui/molecules/ChartCard';
import {
  Filter,
  SalesAdvertisingFilter,
  SalesAdvertisingFilterProvider,
  useSalesAdvertisingFilterContext,
} from '@/ui/molecules/SalesAdvertisingFilter';

export const salesData = [
  { label: '6-10am', value: 40 },
  { label: '10-2pm', value: 170 },
  { label: '2-4pm', value: 95 },
  { label: '6-10pm', value: 117 },
  { label: '10-2am', value: 49 },
  { label: '2-6am', value: 64 },
];

export const advertisingData = [
  { label: '6-10am', value: 40 },
  { label: '10-2pm', value: 60 },
  { label: '2-4pm', value: 45 },
  { label: '6-10pm', value: 117 },
  { label: '10-2am', value: 49 },
  { label: '2-6am', value: 64 },
];

const FrequencyOfSalesInner = () => {
  const { filter } = useSalesAdvertisingFilterContext();

  return (
    <ChartCard
      sx={{ flexGrow: 1 }}
      isLoading={false}
      title={'Frequency of Sales'}
      subtitle={'You sold 162 products in one day.'}
      actions={<SalesAdvertisingFilter />}>
      <BarChart
        isLoading={false}
        data={filter === Filter.Sales ? salesData : advertisingData}
        sx={{ height: '100%' }}
      />
    </ChartCard>
  );
};

export const FrequencyOfSales = () => {
  return (
    <SalesAdvertisingFilterProvider>
      <FrequencyOfSalesInner />
    </SalesAdvertisingFilterProvider>
  );
};
