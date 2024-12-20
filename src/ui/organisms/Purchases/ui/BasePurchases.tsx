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

  const currentValue = quantityByProduct?.data.quantity ?? 0
  const previousValue = quantityByProduct?.data.previous_month_statistic ?? 0
  
  return (
    <ChartInfoCard
      title={title}
      displayValue={String(currentValue)}
      previousValue={previousValue}
      currentValue={currentValue}
      isLoading={isQuantityLoading}
      isError={isQuantityError || isQuantityRangeError || !currentValue}>
      <LineChart
        data={rangeItems}
        isLoading={isQuantityRangeLoading}
        color={currentValue - previousValue > 0 ? 'good' : 'bad'}
      />
    </ChartInfoCard>
  );
};
