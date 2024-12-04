import { useGetImpressionsByVenue } from '@/lib/api';
import { parseDate } from '@/lib/helpers/parse-date';
import { parseNumber } from '@/lib/helpers/parse-number';
import { createTableProps } from '@/ui/organisms/DataTable';
import { GrowthPercent } from '@/ui/atoms/GrowthPercent';
import { DateRangeEnum } from '@/lib/generated/api';

export const useAdvertisingTableProps = () => {
  const { data } = useGetImpressionsByVenue(DateRangeEnum.Day);

  const items = [...(data?.data.items ?? [])].reverse();

  const tableData = items.map((impression) => {
    const previousVenueImpression = items.find(
      (findImpression) =>
        findImpression.venue === impression.venue &&
        new Date(findImpression.time_frame) < new Date(impression.time_frame),
    );

    return {
      id: impression.venue + impression.time_frame,
      growthPercent: previousVenueImpression
        ? ((impression.impressions - previousVenueImpression.impressions) /
            previousVenueImpression.impressions) *
          100
        : 0,
      ...impression,
    };
  });

  return createTableProps({
    data: tableData,
    actionsHidden: true,
    columns: [
      { field: 'venue', title: 'Venue' },
      {
        field: 'impressions',
        title: 'Impressions',
        render: (item) => parseNumber(item.impressions),
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
      },
      {
        field: 'time_frame',
        title: 'Date',
        render: (item) => parseDate(new Date(item.time_frame)),
      },
    ],
  });
};
