import { Box } from '@mui/material';
import { BannerHeader } from '@/ui/organisms/Banner/ui/BannerHeader';
import { BannerCharts } from '@/ui/organisms/Banner/ui/BannerCharts';
import PolygonsImg from '@/assets/img/BannerPolygons.svg';
import { useEffect, useState } from 'react';

export const Banner = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 5000);

    return () => clearTimeout(timeout);
  }, []);

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

      <BannerHeader isLoading={isLoading} />

      <BannerCharts isLoading={isLoading} />
    </Box>
  );
};
