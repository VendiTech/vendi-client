import { Button } from '@/ui/atoms/Button';
import { InputField } from '@/ui/atoms/InputField/InputField';
import { Box, Checkbox, Stack, Typography } from '@mui/material';

export const SignInForm = () => {
  return (
    <Stack
      gap={'32px'}
      justifyContent={'center'}
      width={'320px'}
      sx={{ flex: 1 }}>
      <Box display={'flex'} gap={'8px'} flexDirection={'column'}>
        <Typography
          variant="sm-semibold"
          sx={{
            width: 'fit-content',
            background: 'var(--gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            backgroundColor: 'transparent',
          }}>
          Welcome back!
        </Typography>
        <Typography variant="2xl-medium">Sign in to your account</Typography>
      </Box>
      <Box display={'flex'} gap={'16px'} flexDirection={'column'}>
        <InputField label={'Email or username'} placeholder="Enter" />
        <InputField
          label={'Password'}
          placeholder="Password"
          withPassword
          type="password"
        />
      </Box>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Stack gap={'8px'} direction={'row'} alignItems={'center'}>
          <Checkbox
            sx={{
              width: '16px',
              height: '16px',
              '& .MuiSvgIcon-root': {
                fill: 'var(--slate-200)',
              },

              '&.Mui-checked .MuiSvgIcon-root': {
                fill: 'var(--sky-500)',
              },
            }}
          />
          <Typography variant="sm-regular">Remember me</Typography>
        </Stack>
        <Button size="small" variant="text">
          <Typography variant="xs-semibold">Forgot password?</Typography>
        </Button>
      </Box>
      <Button fullWidth size="large" variant="contained">
        <Typography variant="sm-medium">Sign In</Typography>
      </Button>
    </Stack>
  );
};
