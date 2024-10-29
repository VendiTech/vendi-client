import { Box } from '@mui/material';
import { BannerHeader } from '@/ui/organisms/Banner/ui/BannerHeader';
import { BannerCharts } from '@/ui/organisms/Banner/ui/BannerCharts';
import PolygonsImg from '@/assets/img/BannerPolygons.svg';

export const Banner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        p: 3,
        borderRadius: '10px',
        background: 'var(--gradient)',
        position: 'relative'
      }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        right: 0
      }}>
        <PolygonsImg />
      </Box>

      <BannerHeader />

      <BannerCharts />
    </Box>
  );
};
