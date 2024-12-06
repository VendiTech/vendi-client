import { LineChart } from '@/ui/atoms/LineChart';
import { ChartInfoCard } from '@/ui/molecules/ChartInfoCard';
import {
  useGetAccountData,
  useGetAvgImpressions,
  useGetImpressionsPerRange,
} from '@/lib/api';
import { parseNumber } from '@/lib/helpers/parse-number';

export const BrandTotalImpressions = () => {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetAccountData();

  const {
    data: avgImpressions,
    isLoading: isAvgImpressionsLoading,
    isError: isAvgImpressionsError,
  } = useGetAvgImpressions();

  const {
    data: impressions,
    isLoading: isImpressionsLoading,
    isError: isImpressionsError,
  } = useGetImpressionsPerRange();

  const items = impressions?.data.items ?? [];

  const chartData = items.map((item) => item.impressions);

  const title = `${user?.data.company_name ?? ''} Total Impressions`;

  const total = avgImpressions?.data.impressions ?? 0;
  const previousTotal = avgImpressions?.data.previous_month_statistic ?? 0;

  return (
    <ChartInfoCard
      title={title}
      subtitle={'all sites'}
      displayValue={parseNumber(total)}
      previousValue={previousTotal}
      currentValue={total}
      isError={
        !user || isUserError || isImpressionsError || isAvgImpressionsError
      }
      isLoading={
        isUserLoading || isImpressionsLoading || isAvgImpressionsLoading
      }>
      <LineChart
        isLoading={
          isUserLoading || isImpressionsLoading || isAvgImpressionsLoading
        }
        data={chartData}
        color={total - previousTotal > 0 ? 'good' : 'bad'}
      />
    </ChartInfoCard>
  );
};
