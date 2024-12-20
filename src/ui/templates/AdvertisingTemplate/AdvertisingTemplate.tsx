import { Typography } from '@mui/material';
import { ImpressionsByWeek } from '@/ui/organisms/ImpressionsByWeek';
import { TotalImpressions } from '@/ui/organisms/TotalImpressions';
import { ImpressionsByVenue } from '@/ui/organisms/ImpressionsByVenue';
import { SecondsOfExposure } from '@/ui/organisms/Exposure';
import { BrandTotalImpressions } from '@/ui/organisms/BrandTotalImpressions';
import { TotalAdvertPlayouts } from '@/ui/organisms/TotalAdvertPlayouts';
import { PercentageOfImpressionsMap } from '@/ui/organisms/PercentageOfImpressionsMap';
import { AvgMonthlyImpressionsMap } from '@/ui/organisms/AvgMonthlyImpressionsMap';
import { PercentageOfSalesMap } from '@/ui/organisms/PercentageOfSalesMap';
import { useAdvertisingTableProps } from '@/ui/organisms/AdvertisingTable';
import { TabsTable } from '@/ui/organisms/DataTable';
import { useAdvertisingOverviewTableProps } from '@/ui/organisms/AdvertisingOverviewTable';
import { Flexbox } from '@/ui/atoms/Flexbox';

export const AdvertisingTemplate = () => {
  const overviewTableProps = useAdvertisingOverviewTableProps();
  const advertisingTableProps = useAdvertisingTableProps();

  return (
    <>
      <Flexbox>
        <SecondsOfExposure />

        <BrandTotalImpressions />

        <TotalAdvertPlayouts />
      </Flexbox>

      <Flexbox>
        <ImpressionsByWeek />

        <TotalImpressions />
      </Flexbox>

      <ImpressionsByVenue />

      <Typography
        variant={'sm-medium'}
        sx={{ color: 'var(--slate-900)', pt: 2 }}>
        Geographic breakdown
      </Typography>

      <Flexbox>
        <PercentageOfImpressionsMap />

        <AvgMonthlyImpressionsMap />

        <PercentageOfSalesMap />
      </Flexbox>

      <TabsTable
        tabs={[
          { title: 'Overview', tableProps: overviewTableProps },
          { title: 'Advertising', tableProps: advertisingTableProps },
        ]}
      />
    </>
  );
};
