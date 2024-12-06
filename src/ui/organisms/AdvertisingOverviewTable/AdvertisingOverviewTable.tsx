import { parseDate } from '@/lib/helpers/parse-date';
import { parseNumber } from '@/lib/helpers/parse-number';
import { createTableProps } from '@/ui/organisms/DataTable';
import { GrowthPercent } from '@/ui/atoms/GrowthPercent';
import { useGetImpressionsByVenue } from '@/lib/api';
import { DateRangeEnum } from '@/lib/generated/api';

export const useAdvertisingOverviewTableProps = () => {
  const { data } = useGetImpressionsByVenue();

  const { data: statistic } = useGetImpressionsByVenue(
    DateRangeEnum.Year,
    true,
  );

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
      { field: 'venue', title: 'Venue' },
      {
        field: 'impressions',
        title: 'Impressions',
        render: (item) => parseNumber(item.impressions),
        comparator: (prev, curr) => +prev - +curr,
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
        comparator: (prev, curr) => +prev - +curr,
      },
    ],
  });
};
