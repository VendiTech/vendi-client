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
import { ParsedPermissions } from '@/lib/helpers/parse-permissions';
import { MachineDetailSchema, UserDetail } from '@/lib/generated/api';
import { BaseModal } from '@/ui/molecules/BaseModal';
import { Button, ControlledButton } from '@/ui/atoms/Button';
import { ControlledSelect } from '@/ui/atoms/Select';
import { ControlledInputField } from '@/ui/atoms/InputField';
import { CreateLoginSchema, UpdateLoginSchema } from '../hooks/useLoginSchema';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useGetPaginatedMachines, useGetProducts } from '@/lib/api';
import { CompanyLogo } from '@/ui/atoms/CompanyLogo';
import { useUploadLogoModal } from './UploadLogoModal';
import { PartnerManagementClearButton } from '../ui/PartnerManagementClearButton';

type Props<T extends UpdateLoginSchema | CreateLoginSchema> = {
  defaultValues: CreateLoginSchema;
  onClose: () => void;
  schema: ZodType<T>;
  handler: (
    params: T,
  ) => Promise<
    AxiosResponse<
      { permissions: ParsedPermissions[] } & Omit<UserDetail, 'permissions'>
    >
  >;
  title: string;
  additionalButtons?: ReactNode;
  icon?: File | string;
  onIconChange?: (file: File | string) => void;
  onResetPassword?: () => void;
  onDelete?: () => void;
  dirtyOnly?: boolean;
  isIconChanged?: boolean;
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
    icon,
    onIconChange,
    isIconChanged,
    ...rest
  } = props;
  const [machinesSearchTerm, setMachinesSearchTerm] = useState('');
  const debouncedMachinesSearchTerm = useDebounce(machinesSearchTerm, 750);

  const { data: machines, fetchNextPage } = useGetPaginatedMachines(
    debouncedMachinesSearchTerm,
  );

  const defaultValuesMachinesItems = defaultValues?.machines ?? [];

  const [machinesResponsible, setMachinesResponsible] = useState(
    defaultValuesMachinesItems,
  );

  const allMachines = Array.from(
    new Set([
      ...defaultValuesMachinesItems.map((item) => item.id),
      ...machines.map((item) => item.id),
      ...machinesResponsible.map((item) => item.id),
    ]),
  )
    .map((machineId) =>
      [...machinesResponsible, ...machines].find(
        (machine) => machineId === machine.id,
      ),
    )
    .filter(Boolean) as MachineDetailSchema[];

  const handleMachinesChange = (machinesId: string[]) => {
    setMachinesResponsible(
      allMachines.filter((machine) => machinesId.includes(String(machine.id))),
    );
  };

  const { data: productsData } = useGetProducts();
  const productsDataItems = productsData?.data.items ?? [];

  const defaultValuesProductsItems = defaultValues?.products ?? [];

  const [productsResponsible, setProductsResponsible] = useState(
    defaultValuesProductsItems,
  );

  const allProducts = Array.from(
    new Set([
      ...defaultValuesProductsItems.map((item) => item.id),
      ...productsDataItems.map((item) => item.id),
      ...productsResponsible.map((item) => item.id),
    ]),
  )
    .map((productId) =>
      [...productsResponsible, ...productsDataItems].find(
        (product) => productId === product.id,
      ),
    )
    .filter(Boolean) as any[];

  const handleProductsChange = (productsId: string[]) => {
    setProductsResponsible(
      allProducts.filter((product) => productsId.includes(String(product.id))),
    );
  };

  const formRef = useRef<SetErrorRef<FieldValues>>(null);

  const onSubmit = async (params: T) => {
    try {
      await handler(params);
    } catch (error) {
      if (axios.isAxiosError(error)) {
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

  const [openLogoModal] = useUploadLogoModal();

  const handleUploadLogo = () =>
    openLogoModal({
      onConfirm: (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = (reader.result as string).split(',')[1];
          onIconChange?.(base64String);
        };
        reader.readAsDataURL(file);
      },
    });

  const getAdditionalTitle = () =>
    machinesResponsible.length
      ? `${machinesResponsible.length} machine${machinesResponsible.length ? 's' : ''}`
      : undefined;

  return (
    <BaseModal
      Wrapper={FormWrapper}
      wrapperProps={{
        dirtyOnly,
        ref: formRef,
        defaultValues: {
          ...defaultValues,
          machines: defaultValues?.machines.map((item) => String(item.id)),
          products: defaultValues?.products.map((item) => String(item.id)),
        },
        onSubmit: onSubmit as SubmitHandler<FieldValues>,
        schema,
      }}
      actionButtons={
        <>
          <Button variant={'outlined'} onClick={onClose}>
            Close
          </Button>

          <Button variant={'contained'} onClick={handleUploadLogo}>
            Upload logo
          </Button>

          <ControlledButton isChanged={isIconChanged}>Confirm</ControlledButton>
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
      icon={
        icon ? <CompanyLogo width={30} height={30} src={icon} /> : undefined
      }
      additionalTitle={getAdditionalTitle()}
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
          options={Object.values(ParsedPermissions).map((value) => ({
            key: value,
            value,
          }))}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}>
          <ControlledSelect
            multiple
            fullWidth
            showSearch
            onSearchChange={(e) => setMachinesSearchTerm(e.target.value)}
            onChange={(e) => handleMachinesChange(e.target.value as string[])}
            label={'Machines responsible'}
            name={'machines'}
            displayValue={machinesResponsible
              .map((item) => item.name)
              .join(', ')}
            fetchNextPage={fetchNextPage as () => void}
            options={allMachines.map((item) => ({
              key: item.id,
              value: String(item.id),
              displayValue: item.name,
            }))}
          />

          <PartnerManagementClearButton
            onClear={() => setMachinesResponsible([])}
            field={'machines'}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}>
          <ControlledSelect
            multiple
            fullWidth
            showSearch
            onChange={(e) => handleProductsChange(e.target.value as string[])}
            label={'Products responsible'}
            name={'products'}
            displayValue={productsResponsible
              .map((item) => item.name)
              .join(', ')}
            options={allProducts.map((item) => ({
              key: item.id,
              value: String(item.id),
              displayValue: item.name,
            }))}
          />

          <PartnerManagementClearButton
            onClear={() => setProductsResponsible([])}
            field={'products'}
          />
        </Box>
      </Stack>
    </BaseModal>
  );
};
