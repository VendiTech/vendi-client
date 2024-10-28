import { Button } from '@/ui/atoms/Button';
import { ControlledInputField } from '@/ui/atoms/InputField/ControlledInputField';
import { Box, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

export const ForgotPasswordForm = () => {
  const methods = useForm({
    defaultValues: {
      email: 'admin@gmail.com',
    },
  });

  const submit = () => {
    console.log('submit function');
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submit)}
        style={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}>
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
          <ControlledInputField
            label={'Email address'}
            placeholder="Email address"
            name="email"
          />
          <Button fullWidth size="large" variant="contained" type="submit">
            <Typography variant="sm-medium">Send link</Typography>
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};
