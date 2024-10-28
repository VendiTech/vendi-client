import { Button } from '@/ui/atoms/Button';
import { ControlledInputField } from '@/ui/atoms/InputField/ControlledInputField';
import { Box, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

export const ResetPasswordForm = () => {
  const methods = useForm({
    defaultValues: {
      newPassword: 'admin',
      reEnterNewPassword: 'admin',
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
            <Typography variant="2xl-medium">Reset password</Typography>
            <Typography variant="sm-regular" color="var(--slate-500)">
              Enter new password
            </Typography>
          </Box>
          <Box display={'flex'} gap={'16px'} flexDirection={'column'}>
            <ControlledInputField
              label={'Email'}
              placeholder="New password"
              withPassword
              type="password"
              name="newPassword"
            />
            <ControlledInputField
              label={'Re-enter password'}
              placeholder="'Re-enter password'"
              withPassword
              type="password"
              name="reEnterNewPassword"
            />
          </Box>
          <Button fullWidth size="large" variant="contained" type="submit">
            <Typography variant="sm-medium">Reset password</Typography>
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};
