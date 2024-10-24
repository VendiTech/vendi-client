import { Box } from '@mui/material';
import Image from 'next/image';
import { FC, PropsWithChildren } from 'react';
import Frame from '@/assets/img/Frame 2085664707.png';

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box style={{ height: '100vh', position: 'relative' }}>
      {children}
      <Image
        src={Frame}
        alt="frame"
        quality={100}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
};
