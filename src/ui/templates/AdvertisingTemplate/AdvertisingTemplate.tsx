import { Typography } from '@mui/material';
import { ImpressionsByWeek } from '@/ui/organisms/ImpressionsByWeek';
import { TotalImpressions } from '@/ui/organisms/TotalImpressions';
import { ImpressionsByVenue } from '@/ui/organisms/ImpressionsByVenue';
import { AdvertisingTable } from '@/ui/organisms/AdvertisingTable';
import { SecondsOfExposure } from '@/ui/organisms/SecondsOfExposure';
import { NordicTotalImpressions } from '@/ui/organisms/NordicTotalImpressions';
import { TotalAdvertPlayouts } from '@/ui/organisms/TotalAdvertPlayouts';
import { PercentageOfImpressionsMap } from '@/ui/organisms/PercentageOfImpressionsMap';
import { AvgMonthlyImpressionsMap } from '@/ui/organisms/AvgMonthlyImpressionsMap';
import { PercentageOfSalesMap } from '@/ui/organisms/PercentageOfSalesMap';
import { Flexbox } from '@/ui/atoms/Flexbox';

export const AdvertisingTemplate = () => {
  return (
    <>
      <Flexbox>
        <SecondsOfExposure />

        <NordicTotalImpressions />

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

      <AdvertisingTable />
    </>
  );
};
