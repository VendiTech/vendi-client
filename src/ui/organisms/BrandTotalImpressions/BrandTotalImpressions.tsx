import { LineChart } from '@/ui/atoms/LineChart';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import { useGetAccountData, useGetImpressionsPerRange } from '@/lib/api';
import { parseNumber } from '@/lib/helpers/parse-number';

export const BrandTotalImpressions = () => {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetAccountData();

  const {
    data: impressions,
    isLoading: isImpressionsLoading,
    isError: isImpressionsError,
  } = useGetImpressionsPerRange();

  const items = impressions?.data.items ?? [];

  const chartData = items.map((item) => item.impressions);

  const total = chartData.reduce((acc, curr) => acc + curr, 0);

  const title = `${user?.data.company_name ?? ''} Total Impressions`;

  // TODO get value from api
  const previousTotal = total - 999999;

  return (
    <ChartInfoCard
      title={title}
      subtitle={'all sites'}
      displayValue={parseNumber(total)}
      previousValue={previousTotal}
      currentValue={total}
      isError={!user || isUserError || isImpressionsError}
      isLoading={isUserLoading || isImpressionsLoading}>
      <LineChart
        isLoading={isUserLoading || isImpressionsLoading}
        data={chartData}
        color={total - previousTotal > 0 ? 'good' : 'bad'}
      />
    </ChartInfoCard>
  );
};
