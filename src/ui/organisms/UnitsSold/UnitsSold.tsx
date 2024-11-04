import { useState } from 'react';
import { BarChart } from '@/ui/atoms/BarChart';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { BaseSelect } from '@/ui/atoms/Select';

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

enum Filter {
  Sales = 'Sales',
  Advertising = 'Advertising',
}

export const UnitsSold = () => {
  const [filter, setFilter] = useState<Filter>(Filter.Sales);

  return (
    <ChartCard
      isLoading={false}
      title={'Units sold'}
      subtitle={`You made $203k in revenue this month.`}
      actions={
        <BaseSelect
          showInput={false}
          options={[
            { key: Filter.Sales, value: Filter.Sales },
            { key: Filter.Advertising, value: Filter.Advertising },
          ]}
          value={filter}
          onChange={(e) => setFilter(e.target.value as Filter)}
        />
      }>
      <BarChart
        data={filter === Filter.Sales ? salesData : advertisingData}
        sx={{ flexGrow: 1 }}
        yLabelsCallback={(labelValue) =>
          `$${Math.round(+labelValue / 1000)}${labelValue !== 0 ? 'k' : ''}`
        }
        isLoading={false}
      />
    </ChartCard>
  );
};
