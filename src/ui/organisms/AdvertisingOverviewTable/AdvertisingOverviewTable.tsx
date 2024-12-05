import { parseDate } from '@/lib/helpers/parse-date';
import { parseNumber } from '@/lib/helpers/parse-number';
import { createTableProps } from '@/ui/organisms/DataTable';
import { GrowthPercent } from '@/ui/atoms/GrowthPercent';
import { useGetImpressionsByVenue } from '@/lib/api';

export const useAdvertisingOverviewTableProps = () => {
  const { data } = useGetImpressionsByVenue();

  const tableData = (data?.data.items ?? [])
    .map((item) => ({
      id: item.venue + item.time_frame,
      growthPercent: 1,
      ...item,
    }))
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
      },
      {
        field: 'time_frame',
        title: 'Date',
        render: (item) => parseDate(new Date(item.time_frame)),
      },
    ],
  });
};
