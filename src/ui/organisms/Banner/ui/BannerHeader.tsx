import { Box, Typography } from '@mui/material';
import { BannerLogo } from './BannerLogo';

export const BannerHeader = () => {
  return (
    <Box sx={{ display: 'flex', gap: 3, justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <BannerLogo />

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px' }}>
          <Typography variant={'2xl-medium'}>
            Nordic Spirit
          </Typography>

          <Typography variant={'sm-medium'}>
            @NordicSpirit
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {[{ title: 'Impressions', count: '612k' }, { title: 'Ad Playouts', count: '203k' }].map(({ title, count }) => (
          <Box key={title} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }}>
            <Typography variant={'sm-medium'}>
              {title}
            </Typography>

            <Typography variant={'2xl-medium'}>
              {count}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
