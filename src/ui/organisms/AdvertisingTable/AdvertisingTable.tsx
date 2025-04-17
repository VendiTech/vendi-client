import { useGetImpressionsByVenue } from '@/lib/api';
import { parseDate } from '@/lib/helpers/parse-date';
import { parseNumber } from '@/lib/helpers/parse-number';
import { createTableProps, useSort } from '@/ui/organisms/DataTable';
import { GrowthPercent } from '@/ui/atoms/GrowthPercent';
import { DateRangeEnum } from '@/lib/generated/api';

export const useAdvertisingTableProps = () => {
  const { orderBy, orderDirection, getOnSort } = useSort();

  const { data, total, page, fetchNext } = useGetImpressionsByVenue({
    orderBy,
    orderDirection,
    timeFrame: DateRangeEnum.Day
  });

  const items = [...(data?.data.items ?? [])].reverse();

  const tableData = items.map((impression) => {
    const previousVenueImpression = items.find(
      (findImpression) =>
        findImpression.venue === impression.venue &&
        new Date(findImpression.time_frame) < new Date(impression.time_frame),
    );

    return {
      ...impression,
      id: impression.venue + impression.time_frame,
      growthPercent: previousVenueImpression?.impressions
        ? ((impression.impressions - previousVenueImpression.impressions) /
            previousVenueImpression.impressions) *
          100
        : 0,
    };
  });

  return createTableProps({
    data: tableData,
    actionsHidden: true,
    total,
    page,
    fetchNext,
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
        render: (item) =>
          item.growthPercent ? (
            <GrowthPercent
              sx={{ fontWeight: 'inherit' }}
              percent={item.growthPercent}
            />
          ) : (
            'N/A'
          ),
        onSort: getOnSort(),
      },
      {
        field: 'time_frame',
        title: 'Date',
        render: (item) => parseDate(new Date(item.time_frame), false),
        onSort: getOnSort(),
      },
    ],
  });
};
