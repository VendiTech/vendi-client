import { Box } from '@mui/material';
import Logo from '@/assets/icons/NordicSpiritLogo.svg';

export const BannerLogo = () => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 80,
      height: 80,
      borderRadius: '50%',
      border: '2px solid #ffffff66'
    }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          height: 70,
          borderRadius: '50%',
          overflow: 'hidden',
          background: '#ffffff',
        }}>
        <Logo />
      </Box>
    </Box>
  );
};
