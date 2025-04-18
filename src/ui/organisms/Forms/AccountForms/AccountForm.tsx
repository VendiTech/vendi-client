/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  FormWrapper,
  SetErrorRef,
} from '@/lib/providers/FormProvider/FormProvider';
import { ControlledButton } from '@/ui/atoms/Button';
import { Card } from '@/ui/atoms/Card';
import { ControlledInputField } from '@/ui/atoms/InputField/ControlledInputField';
import { Box, Stack, SxProps, Theme, Typography } from '@mui/material';
import {
  UpdateAccountSchema,
  useAccountSchema,
} from './hooks/useAccountSchema';
import { StatusEnum, UserDetail } from '@/lib/generated/api';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { InputField } from '@/ui/atoms/InputField';
import { Chip } from '@/ui/atoms/Chip';
import { Flexbox } from '@/ui/atoms/Flexbox';
import { useRef } from 'react';
import { FieldValues } from 'react-hook-form';

type Props = {
  data?: UserDetail;
  handler: UseMutateAsyncFunction<
    AxiosResponse<UserDetail, any>,
    Error,
    UpdateAccountSchema,
    unknown
  >;
};

const flexboxChildrenSx: SxProps<Theme> = {
  minWidth: { mobile: 200, tablet: 300 },
};

export const AccountForm = (props: Props) => {
  const { data, handler } = props;

  const schema = useAccountSchema();

  const formRef = useRef<SetErrorRef<FieldValues>>(null);

  const onSubmit = async (params: UpdateAccountSchema) => {
    try {
      await handler({
        ...params,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        const serverErrors = error.response?.data?.detail?.detail;

        if (Array.isArray(serverErrors)) {
          serverErrors.forEach((err: any) => {
            const field = err.loc?.[1];
            if (field) {
              formRef.current?.setError(field as keyof UpdateAccountSchema, {
                type: 'server',
                message: err.msg || 'An error occurred',
              });
            }
          });
        } else if (typeof serverErrors === 'string') {
          formRef.current?.setError('root' as keyof UpdateAccountSchema, {
            type: 'server',
            message: serverErrors,
          });
        }
      } else {
        console.error('Unexpected error', error);
      }
    }
  };

  return (
    <FormWrapper
      ref={formRef}
      schema={schema}
      defaultValues={{
        email: '',
        firstname: '',
        job_title: '',
        lastname: '',
        role: 'user',
        phone_number: '',
      }}
      values={data as UpdateAccountSchema}
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
            value={data?.company_name ?? ''}
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

              <Chip
                variant={
                  data?.status === StatusEnum.Active
                    ? 'good'
                    : data?.status === StatusEnum.Deleted
                      ? 'neutral'
                      : 'neutral'
                }>
                {data?.status === StatusEnum.Active
                  ? 'Active'
                  : data?.status === StatusEnum.Deleted
                    ? 'Deleted'
                    : 'Suspended'}
              </Chip>
            </Stack>
          </Stack>

          <Stack sx={{ gap: 2 }}>
            <InputField label={'User ID'} value={data?.id ?? ''} disabled />

            <Flexbox childrenSx={[flexboxChildrenSx, flexboxChildrenSx]}>
              <ControlledInputField
                fullWidth
                label={'First name'}
                name={'firstname'}
              />

              <ControlledInputField
                fullWidth
                label={'Last name'}
                name={'lastname'}
              />
            </Flexbox>

            <Flexbox childrenSx={[flexboxChildrenSx, flexboxChildrenSx]}>
              <ControlledInputField
                fullWidth
                label={'Job title'}
                name={'job_title'}
              />

              <ControlledInputField fullWidth label={'Role'} name={'role'} />
            </Flexbox>

            <Flexbox childrenSx={[flexboxChildrenSx, flexboxChildrenSx]}>
              <ControlledInputField fullWidth label={'Email'} name={'email'} />

              <ControlledInputField
                fullWidth
                label={'Phone number'}
                name={'phone_number'}
              />
            </Flexbox>
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <ControlledButton>Save changes</ControlledButton>
          </Box>
        </Card>
      </Stack>
    </FormWrapper>
  );
};
