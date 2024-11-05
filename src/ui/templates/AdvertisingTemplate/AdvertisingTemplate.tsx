import { Box } from '@mui/material';
import { AdvertisingInfo } from '@/ui/organisms/AdvertisingInfo';

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
    </>
  );
};
