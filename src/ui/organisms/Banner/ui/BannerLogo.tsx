import { useMemo } from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import { useGetCompanyLogo } from '@/lib/api';
import VendiLogo from '@/assets/icons/partners/Vendi.png';

export const BannerLogo = () => {
  const { data: bannerLogo } = useGetCompanyLogo();

  const logoSrc = useMemo(() => {
    if (bannerLogo?.data) {
      return `data:image/png;base64,${bannerLogo.data}`;
    }
    return VendiLogo;
  }, [bannerLogo]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
      }}>
      <Image width={80} height={80} src={logoSrc} alt={'Brand logo'} />
    </Box>
  );
};
