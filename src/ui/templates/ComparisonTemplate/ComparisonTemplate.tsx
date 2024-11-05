import { Box } from '@mui/material';
import { ProductSplit } from '@/ui/organisms/ProductSplit';
import { SalesVsImpressions } from '@/ui/organisms/SalesVsImpressions';
import { FrequencyOfSalesComparison } from '@/ui/organisms/FrequencyOfSalesComparison';
import { TotalImpressions } from '@/ui/organisms/TotalImpressions';
import { ImpressionsByMonth } from '@/ui/organisms/ImpressionsByMonth';

export const ComparisonTemplate = () => {
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            mobile: 'auto',
            desktop: 'repeat(auto-fit, minmax(512px, 1fr))',
          },
        }}>
        <ProductSplit />

        <SalesVsImpressions />
      </Box>

      <FrequencyOfSalesComparison />

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            mobile: 'auto',
            desktop: 'repeat(auto-fit, minmax(512px, 1fr))',
          },
        }}>
        <ImpressionsByMonth />

        <TotalImpressions />
      </Box>
    </>
  );
};
