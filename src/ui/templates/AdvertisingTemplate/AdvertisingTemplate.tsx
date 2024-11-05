import { Box } from '@mui/material';
import { AdvertisingInfo } from '@/ui/organisms/AdvertisingInfo';
import { ImpressionsByWeek } from '@/ui/organisms/ImpressionsByWeek';
import { TotalImpressions } from '@/ui/organisms/TotalImpressions';
import { ImpressionsByVenue } from '@/ui/organisms/ImpressionsByVenue';
import { GeographicBreakdown } from '@/ui/organisms/GeographicBreakdown';

export const AdvertisingTemplate = () => {
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(auto-fit, minmax(336px, 1fr))',
        }}>
        <AdvertisingInfo />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            mobile: 'auto',
            desktop: 'repeat(auto-fit, minmax(336px, 1fr))',
          },
        }}>
        <ImpressionsByWeek />

        <TotalImpressions />
      </Box>

      <ImpressionsByVenue />

      <GeographicBreakdown />
    </>
  );
};
