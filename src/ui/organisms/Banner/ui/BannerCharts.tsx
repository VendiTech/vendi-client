import { Box } from '@mui/material';
import { colors } from '@/assets/styles/variables';
import {
  useGetAvgExposure,
  useGetAvgImpressions,
  useGetExposurePerRange,
  useGetUnitsSold,
} from '@/lib/api';
import { LineChart } from '@/ui/atoms/LineChart';
import { StackedBarChart } from '@/ui/atoms/StackedBarChart';
import { LoadingText } from '@/ui/atoms/LoadingText';
import { DoughnutChart } from '@/ui/atoms/DoughnutChart';
import { BannerChartWrapper } from './BannerChartWrapper';
import { BannerDivider } from './BannerDivider';

export const BannerCharts = () => {
  const {
    data: unitsSold,
    isLoading: isUnitsSoldLoading,
    isError: isUnitsSoldError,
  } = useGetUnitsSold();

  const unitsSoldData = unitsSold?.data.items.map((item) => item.units) ?? [];
  const unitsSoldTotal = unitsSoldData.reduce((acc, curr) => acc + curr, 0);
  const isNoUnitsSold =
    isUnitsSoldLoading || isUnitsSoldError || !unitsSoldTotal;

  const { data: impressions, isLoading: isImpressionsLoading } =
    useGetAvgImpressions();

  const avgImpressions = impressions?.data.avg_impressions ?? 0;
  const totalImpressions = impressions?.data.total_impressions ?? 0;
  const impressionsPercent =
    Math.round((avgImpressions / totalImpressions) * 10000) / 100;
  const isNoAvgImpressions = isImpressionsLoading || !totalImpressions;

  const { data: screensActivated, isLoading: isScreensActivatedLoading } =
    useGetAvgExposure();
  const { data: screensPerRange, isLoading: isScreensPerRangeLoading } =
    useGetExposurePerRange();

  const screensActivatedItems = screensPerRange?.data.items ?? [];
  const screensActivatedTotal = screensActivatedItems.reduce(
    (acc, curr) => acc + curr.seconds_exposure,
    0,
  );
  const screensActivatedChartData = screensActivatedItems.map((item) => [
    item.seconds_exposure,
    screensActivatedTotal,
  ]);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          desktop:
            'minmax(auto, 288px) auto minmax(auto, 288px) auto minmax(auto, 288px)',
        },
        justifyItems: 'center',
        gap: 2,
      }}>
      <BannerChartWrapper
        isLoading={isNoUnitsSold}
        title={'Units sold'}
        subtitle={String(unitsSoldTotal)}>
        <Box sx={{ width: 100, height: 64 }}>
          <LineChart
            withOpacity
            isLoading={isNoUnitsSold}
            data={unitsSoldData}
            color={'neutral'}
          />
        </Box>
      </BannerChartWrapper>

      <BannerDivider />

      <BannerChartWrapper
        isLoading={isNoAvgImpressions}
        title={'Avg. impressions'}
        subtitle={String(avgImpressions)}>
        <Box sx={{ width: 64, height: 64 }}>
          <DoughnutChart
            data={[avgImpressions]}
            isLoading={isNoAvgImpressions}
            tooltipDisabled
            total={totalImpressions}
            backgroundColor={colors.slate000 + '4d'}
            colors={[colors.slate000]}>
            <LoadingText
              withOpacity
              isLoading={isNoAvgImpressions}
              variant={'sm-semibold'}
              sx={{ fontWeight: 700 }}>
              {impressionsPercent}%
            </LoadingText>
          </DoughnutChart>
        </Box>
      </BannerChartWrapper>

      <BannerDivider />

      <BannerChartWrapper
        isLoading={isScreensActivatedLoading}
        title={'Avg. screens activated'}
        subtitle={String(screensActivated?.data.seconds_exposure)}>
        <Box sx={{ width: 100, height: 64 }}>
          <StackedBarChart
            data={screensActivatedChartData}
            isLoading={isScreensPerRangeLoading}
          />
        </Box>
      </BannerChartWrapper>
    </Box>
  );
};
