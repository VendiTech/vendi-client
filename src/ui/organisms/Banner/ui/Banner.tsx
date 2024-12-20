import { Box } from '@mui/material';
import PolygonsImg from '@/assets/img/BannerPolygons.svg';
import { BannerHeader } from './BannerHeader';
import { BannerCharts } from './BannerCharts';

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
        color: 'var(--slate-000)',
        position: 'relative',
      }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}>
        <PolygonsImg />
      </Box>

      <BannerHeader />

      <BannerCharts />
    </Box>
  );
};
