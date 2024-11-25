import { ReactNode, useState } from 'react';
import { Box, SxProps, Theme, Typography } from '@mui/material';
import { FormWrapper } from '@/lib/providers/FormProvider/FormProvider';
import { useDebounce } from '@/lib/helpers/use-debounce';
import { useGetMachines } from '@/lib/api';
import { PermissionEnum, UserDetail } from '@/lib/generated/api';
import { BaseModal } from '@/ui/molecules/BaseModal';
import { Button } from '@/ui/atoms/Button';
import { BaseSelect } from '@/ui/atoms/Select';
import { ControlledInputField } from '@/ui/atoms/InputField/ControlledInputField';
import { useLoginSchema } from './useLoginSchema';

type Props = {
  defaultValues?: UserDetail;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  additionalButtons?: ReactNode;
  onResetPassword?: () => void;
  onDelete?: () => void;
};

const formBoxSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  p: '1px',
};

export const BaseLoginModal = (props: Props) => {
  const {
    defaultValues,
    onClose,
    onConfirm,
    onResetPassword,
    onDelete,
    ...rest
  } = props;

  const [machinesSearchTerm, setMachinesSearchTerm] = useState('');
  const debouncedMachinesSearchTerm = useDebounce(machinesSearchTerm, 750);

  const { data: machinesData } = useGetMachines(debouncedMachinesSearchTerm);
  const machines = machinesData?.data.items ?? [];

  const schema = useLoginSchema();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <BaseModal
      actionButtons={
        <>
          <Button variant={'outlined'} onClick={onClose}>
            Close
          </Button>

          <Button variant={'contained'} onClick={handleConfirm}>
            Confirm
          </Button>
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
      <FormWrapper
        defaultValues={defaultValues}
        onSubmit={console.log}
        schema={schema}>
        <Box sx={formBoxSx}>
          <Typography variant={'sm-medium'}>User Information</Typography>

          <ControlledInputField fullWidth label={'Email'} name={'email'} />
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
        </Box>

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

        <Box sx={formBoxSx}>
          <Typography variant={'sm-medium'}>Responsibilities</Typography>

          <BaseSelect
            multiple
            fullWidth
            label={'Permissions'}
            options={Object.values(PermissionEnum).map((value) => ({
              key: value,
              value,
            }))}
          />
          <BaseSelect
            multiple
            fullWidth
            showSearch
            onSearchChange={(e) => setMachinesSearchTerm(e.target.value)}
            label={'Machines responsible'}
            options={machines.map((item) => ({
              key: item.id,
              value: String(item.id),
              displayValue: item.name,
            }))}
          />
        </Box>
      </FormWrapper>
    </BaseModal>
  );
};
