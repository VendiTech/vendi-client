import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { useGetQuantityByProduct, useGetUnitsSold } from '@/lib/api';
import { LineChart } from '@/ui/atoms/LineChart';

export const UnitsSoldComparison = () => {
  const {
    data: unitsSold,
    isLoading: isUnitsSoldLoading,
    isError: isUnitsSoldError,
  } = useGetUnitsSold();

  const unitsSoldData = (unitsSold?.data.items ?? []).map((item) => item.units);

  const {
    data: salesStatistic,
    isLoading: isStatisticLoading,
    isError: isStatisticError,
  } = useGetQuantityByProduct();

  const currentValue = salesStatistic?.data.quantity ?? 0;
  const previousValue = salesStatistic?.data.previous_month_statistic ?? 0;

  const isError = !currentValue || isUnitsSoldError || isStatisticError;

  return (
    <ChartInfoCard
      title={'Total units sold'}
      displayValue={String(currentValue)}
      previousValue={previousValue}
      currentValue={currentValue}
      isError={isError}
      isLoading={isStatisticLoading || isUnitsSoldLoading}>
      <LineChart
        data={unitsSoldData}
        isLoading={isUnitsSoldLoading}
        color={currentValue > previousValue ? 'good' : 'bad'}
      />
    </ChartInfoCard>
  );
};
