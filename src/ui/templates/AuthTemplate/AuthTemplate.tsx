'use client';

import { Stack } from '@mui/material';
import LogoColored from '@/assets/icons/LogoColored.svg';
import { FC, PropsWithChildren } from 'react';

export const AuthTemplate: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack alignItems={'center'} height={'100%'} padding={'24px'}>
      <Stack
        justifyContent={'space-between'}
        height={'100%'}
        alignItems={'center'}>
        <LogoColored />
        {children}
      </Stack>
    </Stack>
  );
};
