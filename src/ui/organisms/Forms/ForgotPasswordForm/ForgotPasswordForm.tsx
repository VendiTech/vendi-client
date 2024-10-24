import { Button } from '@/ui/atoms/Button';
import { InputField } from '@/ui/atoms/InputField/InputField';
import { Box, Stack, Typography } from '@mui/material';

export const ForgotPasswordForm = () => {
  return (
    <Stack
      gap={'32px'}
      justifyContent={'center'}
      width={'320px'}
      sx={{ flex: 1 }}>
      <Box display={'flex'} gap={'8px'} flexDirection={'column'}>
        <Typography variant="2xl-medium">Forgot password</Typography>
        <Typography variant="sm-regular" color="var(--slate-500)">
          We’ll send you an email with a reset link
        </Typography>
      </Box>
      <InputField label={'Email address'} placeholder="Email address" />
      <Button fullWidth size="large" variant="contained">
        <Typography variant="sm-medium">Send link</Typography>
      </Button>
    </Stack>
  );
};
