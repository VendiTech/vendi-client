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

  useEffect(() => {
    if (!search) {
      router.push(Routes.SignIn);
      return;
    }
  }, [search, router]);

  const { isError, isLoading, isSuccess } = useGetVerified(search || '');

  useEffect(() => {
    if (isSuccess) {
      router.push(Routes.Dashboard);
    }
  }, [isSuccess, router]);

  if (isLoading) {
    return (
      <Box
        width={'100vw'}
        height={'100vh'}
        display="flex"
        justifyContent="center"
        alignItems="center">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        width={'100vw'}
        height={'100vh'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}>
        <Stack>
          <Typography>Error occurred</Typography>
          <Button
            variant="contained"
            onClick={() => router.push(Routes.SignIn)}>
            Return
          </Button>
        </Stack>
      </Box>
    );
  }

  return null;
}
