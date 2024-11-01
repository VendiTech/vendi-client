import { Button } from '@/ui/atoms/Button';
import { ControlledInputField } from '@/ui/atoms/InputField/ControlledInputField';
import { Box, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuthForgotPassword } from './hooks/useAuthForgotPassword';
import { ForgotPasswordSchema } from './types';
import { useRouter } from 'next/navigation';
import { useForgotPasswordSchema } from './hooks/useForgotPasswordSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const ForgotPasswordForm = () => {
  const router = useRouter();

  const schema = useForgotPasswordSchema();

  type Schema = z.infer<typeof schema>;

  const methods = useForm<Schema>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  });

  const { mutateAsync } = useAuthForgotPassword();

  const onSubmit = async (params: ForgotPasswordSchema) => {
    try {
      await mutateAsync(params);

      router.push('/admin');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
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
