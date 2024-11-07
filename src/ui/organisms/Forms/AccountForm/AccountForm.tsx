/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FormWrapper } from '@/lib/providers/FormProvider/FormProvider';
import { ControlledButton } from '@/ui/atoms/Button';
import { Card } from '@/ui/atoms/Card';
import { ControlledInputField } from '@/ui/atoms/InputField/ControlledInputField';
import { Box, Grid2, Stack, Typography } from '@mui/material';
import {
  UpdateAccountSchema,
  useAccountSchema,
} from './hooks/useAccountSchema';
import { UserDetail } from '@/lib/generated/api';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { InputField } from '@/ui/atoms/InputField';
import { Chip } from '@/ui/atoms/Chip';

type Props = {
  data: UserDetail;
  handler: UseMutateAsyncFunction<
    AxiosResponse<UserDetail, any>,
    Error,
    UpdateAccountSchema,
    unknown
  >;
};

export const AccountForm = (props: Props) => {
  const { data, handler } = props;

  const schema = useAccountSchema();

  const onSubmit = async (params: UpdateAccountSchema) => {
    try {
      await handler({
        ...params,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrapper
      schema={schema}
      defaultValues={data as UpdateAccountSchema}
      onSubmit={onSubmit}
      dirtyOnly>
      <Stack
        gap={2}
        sx={{
          maxWidth: '688px',
        }}>
        <Card>
          <Typography variant="lg-medium">Company</Typography>
          <InputField
            placeholder="Company"
            label="Name"
            value={data.company_name ?? ''}
            disabled
          />
        </Card>
        <Card>
          <Stack sx={{ gap: '6px' }}>
            <Typography variant="lg-medium">User Information</Typography>
            <Stack gap={'5px'} flexDirection={'row'} alignItems={'center'}>
              <Typography variant="xs-regular">
                Your account status is
              </Typography>
              <Chip variant="good">Active</Chip>
            </Stack>
          </Stack>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <InputField
                fullWidth
                label={'User ID'}
                value={data.id ?? ''}
                disabled
              />
            </Grid2>

            <Grid2 size={6}>
              <ControlledInputField
                fullWidth
                label={'First name'}
                name={'firstname'}
              />
            </Grid2>

            <Grid2 size={6}>
              <ControlledInputField
                fullWidth
                label={'Last name'}
                name="lastname"
              />
            </Grid2>

            <Grid2 size={6}>
              <ControlledInputField
                fullWidth
                label={'Job title'}
                name="job_title"
              />
            </Grid2>

            <Grid2 size={6}>
              <ControlledInputField fullWidth label={'Role'} name="role" />
            </Grid2>

            <Grid2 size={6}>
              <ControlledInputField fullWidth label={'Email'} name="email" />
            </Grid2>

            <Grid2 size={6}>
              <ControlledInputField
                fullWidth
                label={'Phone number'}
                name="phone_number"
              />
            </Grid2>
          </Grid2>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <ControlledButton>Save changes</ControlledButton>
          </Box>
        </Card>
      </Stack>
    </FormWrapper>
  );
};
