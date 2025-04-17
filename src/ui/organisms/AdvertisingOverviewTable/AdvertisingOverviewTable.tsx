import { parseNumber } from '@/lib/helpers/parse-number';
import { createTableProps, useSort } from '@/ui/organisms/DataTable';
import { GrowthPercent } from '@/ui/atoms/GrowthPercent';
import { useGetImpressionsByVenue } from '@/lib/api';
import { DateRangeEnum } from '@/lib/generated/api';

export const useAdvertisingOverviewTableProps = () => {
  const { orderBy, orderDirection, getOnSort } = useSort();

  const { data } = useGetImpressionsByVenue({ orderBy, orderDirection });

  const { data: statistic } = useGetImpressionsByVenue({
    orderBy,
    orderDirection,
    timeFrame: DateRangeEnum.Year,
    getStatistic: true,
  });

  const dataItems = data?.data.items ?? [];
  const statisticItems = statistic?.data.items ?? [];

  const tableData = dataItems
    .map((item) => {
      const previousImpressions =
        statisticItems.find(
          (statisticItem) => statisticItem.venue === item.venue,
        )?.impressions ?? 0;

      return {
        id: item.venue + item.time_frame,
        growthPercent:
          ((item.impressions - previousImpressions) / previousImpressions) *
          100,
        ...item,
      };
    })
    .reverse();

  return createTableProps({
    data: tableData,
    actionsHidden: true,
    columns: [
      { field: 'venue', title: 'Venue', onSort: getOnSort() },
      {
        field: 'impressions',
        title: 'Impressions',
        render: (item) => parseNumber(item.impressions),
        onSort: getOnSort(),
      },
      {
        field: 'growthPercent',
        title: '% Change',
        render: (item) => (
          <GrowthPercent
            sx={{ fontWeight: 'inherit' }}
            percent={item.growthPercent}
          />
        ),
        onSort: getOnSort(),
      },
    ],
  });
};
