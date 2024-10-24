import { Button } from '@/ui/atoms/Button';
import { InputField } from '@/ui/atoms/InputField/InputField';
import { Box, Stack, Typography } from '@mui/material';

export const ResetPasswordForm = () => {
  return (
    <Stack
      gap={'32px'}
      justifyContent={'center'}
      width={'320px'}
      sx={{ flex: 1 }}>
      <Box display={'flex'} gap={'8px'} flexDirection={'column'}>
        <Typography variant="2xl-medium">Reset password</Typography>
        <Typography variant="sm-regular" color="var(--slate-500)">
          Enter new password
        </Typography>
      </Box>
      <Box display={'flex'} gap={'16px'} flexDirection={'column'}>
        <InputField
          label={'Email'}
          placeholder="New password"
          withPassword
          type="password"
        />
        <InputField
          label={'Re-enter password'}
          placeholder="'Re-enter password'"
          withPassword
          type="password"
        />
      </Box>
      <Button fullWidth size="large" variant="contained">
        <Typography variant="sm-medium">Reset password</Typography>
      </Button>
    </Stack>
  );
};
