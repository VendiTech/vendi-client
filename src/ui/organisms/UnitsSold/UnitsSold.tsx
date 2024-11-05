import { BarChart } from '@/ui/atoms/BarChart';
import { ChartCard } from '@/ui/molecules/ChartCard';
import {
  Filter,
  SalesAdvertisingFilter,
  SalesAdvertisingFilterProvider,
  useSalesAdvertisingFilterContext
} from '@/ui/molecules/SalesAdvertisingFilter';
import { parseNumber } from '@/lib/helpers/parse-number';

export const salesData = [
  { label: 'Dec 4, 2023', value: 45954 },
  { label: 'Jan 11', value: 171567 },
  { label: 'Jan 21', value: 95234 },
  { label: 'Feb 4', value: 120145 },
];

export const advertisingData = [
  { label: 'Dec 4, 2023', value: 21954 },
  { label: 'Jan 11', value: 10567 },
  { label: 'Jan 21', value: 9234 },
  { label: 'Feb 4', value: 11145 },
];

const UnitsSoldInner = () => {
  const { filter } = useSalesAdvertisingFilterContext();

  return (
    <ChartCard
      isLoading={false}
      title={'Units sold'}
      subtitle={`You made $203k in revenue this month.`}
      actions={<SalesAdvertisingFilter />}>
      <BarChart
        data={filter === Filter.Sales ? salesData : advertisingData}
        sx={{ flexGrow: 1 }}
        yLabelsCallback={(labelValue) =>
          `$${parseNumber(+labelValue, true)}`
        }
        isLoading={false}
      />
    </ChartCard>
  );
};

export const UnitsSold = () => {
  return (
    <SalesAdvertisingFilterProvider>
      <UnitsSoldInner />
    </SalesAdvertisingFilterProvider>
  );
};
