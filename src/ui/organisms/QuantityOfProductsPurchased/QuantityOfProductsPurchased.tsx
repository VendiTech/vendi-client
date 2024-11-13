import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { LineChart } from '@/ui/atoms/LineChart';
import { useGetQuantityByProduct, useGetQuantityPerRange } from '@/lib/api';

export const QuantityOfProductsPurchased = () => {
  const {
    data: quantityByProduct,
    isLoading: isQuantityLoading,
    isError: isQuantityError,
  } = useGetQuantityByProduct();
  const {
    data: quantityByRange,
    isLoading: isQuantityRangeLoading,
    isError: isQuantityRangeError,
  } = useGetQuantityPerRange();

  const rangeItems =
    quantityByRange?.data.items.map((item) => item.quantity) ?? [];

  const deltaQuantity = rangeItems[rangeItems.length - 1] - rangeItems[0];

  return (
    <ChartInfoCard
      title={'Quantity of Products Purchased'}
      value={String(quantityByProduct?.data.quantity)}
      growthPercent={deltaQuantity}
      isLoading={isQuantityLoading}
      isError={isQuantityError || isQuantityRangeError}
    >
      <LineChart
        data={rangeItems}
        isLoading={isQuantityRangeLoading}
        color={deltaQuantity > 0 ? 'good' : 'bad'}
      />
    </ChartInfoCard>
  );
};
