import { Box } from '@mui/material';
import { Banner } from '@/ui/organisms/Banner';
import { UnitsSold } from '@/ui/organisms/UnitsSold';
import { ProductSplit } from '@/ui/organisms/ProductSplit';
import { FrequencyOfSales } from '@/ui/organisms/FrequencyOfSales';
import { ProductByGeography } from '@/ui/organisms/ProductByGeography';
import { ConversionRate } from '@/ui/organisms/ConversionRate';
import { DashboardInfo } from '@/ui/organisms/DashboardInfo/DashboardInfo';

export const DashboardTemplate = () => {
  return (
    <>
      <Banner />

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(auto-fit, minmax(336px, 1fr))',
        }}>
        <DashboardInfo />
      </Box>

      <UnitsSold />

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

        <FrequencyOfSales />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            mobile: 'auto',
            desktop: '2fr 1fr',
          },
        }}>
        <ProductByGeography />

        <ConversionRate />
      </Box>
    </>
  );
};
