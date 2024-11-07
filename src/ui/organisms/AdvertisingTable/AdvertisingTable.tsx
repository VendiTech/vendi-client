import { advertisingOverviewData } from '@/assets/mocks/advertising-table';
import { parseDate } from '@/lib/helpers/parse-date';
import { parseNumber } from '@/lib/helpers/parse-number';
import { createTableProps, TabsTable } from '@/ui/organisms/DataTable';
import { GrowthPercent } from '@/ui/atoms/GrowthPercent';

export const AdvertisingTable = () => {
  const overviewData = advertisingOverviewData.map((item) => ({
    id: item.venue,
    ...item,
  }));

  const overviewTableProps = createTableProps({
    data: overviewData,
    columns: [
      { field: 'venue', title: 'Venue' },
      {
        field: 'impressions',
        title: 'Impressions',
        render: (item) => parseNumber(item.impressions),
      },
      {
        field: 'changePercent',
        title: '% Change',
        render: (item) => (
          <GrowthPercent
            sx={{ fontWeight: 'inherit' }}
            percent={item.changePercent}
          />
        ),
      },
      { field: 'date', title: 'Date', render: (item) => parseDate(item.date) },
    ],
  });

  return (
    <TabsTable
      tabs={[
        { title: 'Overview', tableProps: overviewTableProps },
        { title: 'Advertising', tableProps: overviewTableProps },
      ]}
    />
  );
};
