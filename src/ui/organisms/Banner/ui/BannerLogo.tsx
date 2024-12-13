import { useState } from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import { useBannerLogoPath } from '../helpers/useBannerLogoPath';

export const BannerLogo = () => {
  const { iconPath, fallbackPath } = useBannerLogoPath();

  const [imgSrc, setImgSrc] = useState(iconPath);

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
        src={imgSrc}
        alt={'Brand logo'}
        onError={() => setImgSrc(fallbackPath)}
      />
    </Box>
  );
};
