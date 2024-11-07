import { BaseSelect } from '@/ui/atoms/Select';
import {
  Filter,
  useSalesAdvertisingFilterContext,
} from '@/ui/molecules/SalesAdvertisingFilter/SalesAdvertisingFilterContext';

export const SalesAdvertisingFilter = () => {
  const { filter, setFilter } = useSalesAdvertisingFilterContext();

  return (
    <BaseSelect
      showInput={false}
      options={[
        { key: Filter.Sales, value: Filter.Sales },
        { key: Filter.Advertising, value: Filter.Advertising },
      ]}
      value={filter}
      onChange={(e) => setFilter(e.target.value as Filter)}
    />
  );
};
