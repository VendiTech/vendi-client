import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { LineChart } from '@/ui/atoms/LineChart';
import { useGetQuantityByProduct, useGetQuantityPerRange } from '@/lib/api';

type Props = {
  title: string;
  filterByProduct?: boolean;
};

export const BasePurchases = (props: Props) => {
  const { title, filterByProduct } = props;

  const {
    data: quantityByProduct,
    isLoading: isQuantityLoading,
    isError: isQuantityError,
  } = useGetQuantityByProduct(filterByProduct);
  const {
    data: quantityByRange,
    isLoading: isQuantityRangeLoading,
    isError: isQuantityRangeError,
  } = useGetQuantityPerRange(filterByProduct);

  const rangeItems =
    quantityByRange?.data.items.map((item) => item.quantity) ?? [];

  const startValue = rangeItems[0];
  const endValue = rangeItems[rangeItems.length - 1];

  return (
    <ChartInfoCard
      title={title}
      value={String(quantityByProduct?.data.quantity)}
      startValue={startValue}
      endValue={endValue}
      isLoading={isQuantityLoading}
      isError={isQuantityError || isQuantityRangeError}>
      <LineChart
        data={rangeItems}
        isLoading={isQuantityRangeLoading}
        color={endValue - startValue > 0 ? 'good' : 'bad'}
      />
    </ChartInfoCard>
  );
};
