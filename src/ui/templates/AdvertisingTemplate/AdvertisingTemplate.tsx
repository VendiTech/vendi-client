import { ImpressionsByWeek } from '@/ui/organisms/ImpressionsByWeek';
import { TotalImpressions } from '@/ui/organisms/TotalImpressions';
import { ImpressionsByVenue } from '@/ui/organisms/ImpressionsByVenue';
import { GeographicBreakdown } from '@/ui/organisms/GeographicBreakdown';
import { AdvertisingTable } from '@/ui/organisms/AdvertisingTable';
import { SecondsOfExposure } from '@/ui/organisms/SecondsOfExposure';
import { NordicTotalImpressions } from '@/ui/organisms/NordicTotalImpressions';
import { TotalAdvertPlayouts } from '@/ui/organisms/TotalAdvertPlayouts';
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

      <GeographicBreakdown />

      <AdvertisingTable />
    </>
  );
};
