import Image from 'next/image';
import { Box } from '@mui/material';
import { useGetCompanyLogo } from '@/lib/api';
import VendiLogo from '@/assets/icons/partners/Vendi.png';
import { getBase64Image } from '@/lib/helpers/get-base64-image';

export const BannerLogo = () => {
  const { data: bannerLogo } = useGetCompanyLogo();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
      }}>
      <Image
        width={80}
        height={80}
        src={bannerLogo?.data ? getBase64Image(bannerLogo.data) : VendiLogo}
        alt={'Brand logo'}
      />
    </Box>
  );
};
