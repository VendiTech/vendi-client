/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/ui/atoms/Button';
import { ControlledInputField } from '@/ui/atoms/InputField/ControlledInputField';
import { Box, Stack, Typography } from '@mui/material';
import { ForgotPasswordSchema } from './types';
import { useForgotPasswordSchema } from './hooks/useForgotPasswordSchema';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { FormWrapper } from '@/lib/providers/FormProvider/FormProvider';
import { LoadingContent } from '@/ui/atoms/LoadingContent';

type Props = {
  handler: UseMutateAsyncFunction<
    AxiosResponse<any, any>,
    Error,
    ForgotPasswordSchema,
    unknown
  >;
  isLoading: boolean;
};

export const ForgotPasswordForm = (props: Props) => {
  const { handler, isLoading } = props;

  const schema = useForgotPasswordSchema();

  const onSubmit = async (params: ForgotPasswordSchema) => {
    try {
      await handler(params);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrapper
      onSubmit={onSubmit}
      schema={schema}
      defaultValues={{ email: '' }}
      style={{
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
      <LoadingContent isLoading={isLoading}>
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
      </LoadingContent>
    </FormWrapper>
  );
};
