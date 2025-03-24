/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodType } from 'zod';
import { ReactNode, useRef, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Box, Stack, SxProps, Theme, Typography } from '@mui/material';
import {
  FormWrapper,
  SetErrorRef,
} from '@/lib/providers/FormProvider/FormProvider';
import { useDebounce } from '@/lib/helpers/use-debounce';
import {
  MachineDetailSchema,
  PermissionEnum,
  UserDetail,
} from '@/lib/generated/api';
import { BaseModal } from '@/ui/molecules/BaseModal';
import { Button, ControlledButton } from '@/ui/atoms/Button';
import { ControlledSelect } from '@/ui/atoms/Select';
import { ControlledInputField } from '@/ui/atoms/InputField';
import { CreateLoginSchema, UpdateLoginSchema } from '../hooks/useLoginSchema';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useGetPaginatedMachines } from '@/lib/api/hooks/machines/useGetMachines';
import { useGetProductsCategories } from '@/lib/api';

type Props<T extends UpdateLoginSchema | CreateLoginSchema> = {
  defaultValues: CreateLoginSchema;
  onClose: () => void;
  schema: ZodType<T>;
  handler: (params: T) => Promise<AxiosResponse<UserDetail>>;
  title: string;
  additionalButtons?: ReactNode;
  onResetPassword?: () => void;
  onDelete?: () => void;
  dirtyOnly?: boolean;
};

const formBoxSx: SxProps<Theme> = {
  maxWidth: 450,
  gap: 2,
  p: '1px',
};

export const BaseLoginModal = <T extends UpdateLoginSchema | CreateLoginSchema>(
  props: Props<T>,
) => {
  const {
    schema,
    defaultValues,
    onClose,
    handler,
    onResetPassword,
    onDelete,
    dirtyOnly,
    ...rest
  } = props;

  const { data: productsItems } = useGetProductsCategories();
  const products = productsItems?.data.items ?? []
  
  const [machinesSearchTerm, setMachinesSearchTerm] = useState('');
  const debouncedMachinesSearchTerm = useDebounce(machinesSearchTerm, 750);

  const { data: machines, fetchNextPage } = useGetPaginatedMachines(
    debouncedMachinesSearchTerm,
  );

  const machinesDataItems =
    machines?.pages.map((page) => page.data.items.flat()).flat() ?? [];

  const defaultValuesMachinesItems = defaultValues?.machines ?? [];

  const [machinesResponsible, setMachinesResponsible] = useState(
    defaultValuesMachinesItems,
  );

  const allMachines = Array.from(
    new Set([
      ...defaultValuesMachinesItems.map((item) => item.id),
      ...machinesDataItems.map((item) => item.id),
      ...machinesResponsible.map((item) => item.id),
    ]),
  )
    .map((machineId) =>
      [...machinesResponsible, ...machinesDataItems].find(
        (machine) => machineId === machine.id,
      ),
    )
    .filter(Boolean) as MachineDetailSchema[];

  const handleMachinesChange = (machinesId: string[]) => {
    setMachinesResponsible(
      allMachines.filter((machine) => machinesId.includes(String(machine.id))),
    );
  };

  const formRef = useRef<SetErrorRef<FieldValues>>(null);

  const onSubmit = async (params: T) => {
    try {
      await handler(params);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        const serverErrors = error.response?.data?.detail?.detail;

        if (Array.isArray(serverErrors)) {
          serverErrors.forEach((err: any) => {
            const field = err.loc?.[1];
            if (field) {
              //@ts-expect-error Error
              formRef.current?.setError(field as keyof T, {
                type: 'server',
                message: err.msg || 'An error occurred',
              });
            }
          });
        } else if (typeof serverErrors === 'string') {
          //@ts-expect-error Error
          formRef.current?.setError('root' as keyof T, {
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
    <BaseModal
      Wrapper={FormWrapper}
      wrapperProps={{
        dirtyOnly,
        ref: formRef,
        defaultValues: {
          ...defaultValues,
          machines: defaultValues?.machines.map((item) => String(item.id)),
        },
        onSubmit: onSubmit as SubmitHandler<FieldValues>,
        schema,
      }}
      actionButtons={
        <>
          <Button variant={'outlined'} onClick={onClose}>
            Close
          </Button>

          <ControlledButton>Confirm</ControlledButton>
        </>
      }
      additionalButtons={
        onDelete ? (
          <Button onClick={onDelete} variant={'outlined'} color={'secondary'}>
            Delete account
          </Button>
        ) : null
      }
      onClose={onClose}
      titleMargin={'large'}
      sx={{
        '& .MuiDialogContent-root': {
          overflow: 'visible',
        },
      }}
      {...rest}>
      <Stack sx={formBoxSx}>
        <Typography variant={'sm-medium'}>User Information</Typography>

        <ControlledInputField fullWidth label={'Email'} name={'email'} />
        <ControlledInputField
          fullWidth
          label={'First name'}
          name={'firstname'}
        />
        <ControlledInputField fullWidth label={'Last name'} name={'lastname'} />
      </Stack>

      <Box sx={{ pb: '24px' }}>
        {onResetPassword ? (
          <Button
            animationDisabled
            sx={{
              '&.MuiButtonBase-root': {
                px: '0',
              },
            }}
            onClick={onResetPassword}>
            Reset password
          </Button>
        ) : null}
      </Box>

      <Stack sx={formBoxSx}>
        <Typography variant={'sm-medium'}>Responsibilities</Typography>

        <ControlledSelect
          multiple
          fullWidth
          label={'Permissions'}
          name={'permissions'}
          options={Object.values(PermissionEnum).map((value) => ({
            key: value,
            value,
          }))}
        />
        <ControlledSelect
          multiple
          fullWidth
          showSearch
          onSearchChange={(e) => setMachinesSearchTerm(e.target.value)}
          onChange={(e) => handleMachinesChange(e.target.value as string[])}
          label={'Machines responsible'}
          name={'machines'}
          displayValue={machinesResponsible.map((item) => item.name).join(', ')}
          fetchNextPage={fetchNextPage as () => void}
          options={allMachines.map((item) => ({
            key: item.id,
            value: String(item.id),
            displayValue: item.name,
          }))}
        />
        <ControlledSelect
          multiple
          fullWidth
          showSearch
          label={'Products responsible'}
          name={'products'}
          options={products.map((item) => ({
            key: item.category_id,
            value: String(item.category_id),
            displayValue: item.category_name,
          }))}
        />
      </Stack>
    </BaseModal>
  );
};
