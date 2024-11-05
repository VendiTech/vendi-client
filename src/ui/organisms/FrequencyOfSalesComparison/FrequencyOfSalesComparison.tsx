import { ChartCard } from '@/ui/molecules/ChartCard';
import { MultiBarChart } from '@/ui/atoms/MultiBarChart';

const data = [
  { label: 'January', values: [31, 27, 12] },
  { label: 'February', values: [31, 27, 12] },
  { label: 'March', values: [31, 27, 12] },
  { label: 'April', values: [34, 47, 22] },
  { label: 'May', values: [33, 28, 5] },
  { label: 'June', values: [24, 19, 0] },
  { label: 'July', values: [17, 31, 8] },
  { label: 'August', values: [40, 25, 15] },
  { label: 'September', values: [40, 25, 15] },
  { label: 'October', values: [40, 25, 15] },
  { label: 'November', values: [40, 25, 15] },
  { label: 'December', values: [40, 25, 15] },
];

const products = ['Mint', 'Spearmint', 'Watermelon'];
export const FrequencyOfSalesComparison = () => {
  return (
    <ChartCard title={'Frequency of Sales'} subtitle={'Lorem ipsum'}>
      <MultiBarChart categories={products} data={data} sx={{ flexGrow: 1 }} />
    </ChartCard>
  );
};
