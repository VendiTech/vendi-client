'use client';

import { useGetVerified } from '@/lib/api/hooks/useGetVerified';
import { Routes } from '@/lib/constants/routes';
import { Button } from '@/ui/atoms/Button';
import { Box, Stack, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ForgotPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get('token');

  if (!search) {
    router.push(Routes.SignIn);
  }

  const { isError, isLoading, isSuccess } = useGetVerified(search!);

  useEffect(() => {
    if (isSuccess) {
      router.push(Routes.Dashboard);
    }
  }, [isSuccess, router]);

  if (isError) {
    return (
      <Box
        width={'100wh'}
        height={'100vh'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}>
        <Stack>
          <Typography>Error occured</Typography>
          <Button
            variant="contained"
            onClick={() => router.push(Routes.SignIn)}>
            Return
          </Button>
        </Stack>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box width={'100wh'} height={'100vh'}>
        <p>Loading...</p>
      </Box>
    );
  }
}
