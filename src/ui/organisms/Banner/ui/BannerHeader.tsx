import { Box } from '@mui/material';
import Logo from '@/assets/icons/NordicSpiritLogo.svg';

export const BannerHeader = () => {
  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            p: '5.5px',
            borderRadius: '50%',
            overflow: 'hidden',
            background: '#ffffff'
          }}>
          <Logo />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}></Box>
    </Box>
  );
};
