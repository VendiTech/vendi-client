import { ReactNode } from 'react';
import { Box, SxProps, Theme, Typography } from '@mui/material';
import { BaseModal } from '@/ui/molecules/BaseModal';
import { Button } from '@/ui/atoms/Button';
import { BaseSelect } from '@/ui/atoms/Select';
import { InputField } from '@/ui/atoms/InputField';

type Props = {
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
  const { onClose, onConfirm, onResetPassword, onDelete, ...rest } = props;

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
      <Box sx={formBoxSx}>
        <Typography variant={'sm-medium'}>User Information</Typography>

        <InputField fullWidth label={'Email'} />
        <InputField fullWidth label={'Name'} />
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
          fullWidth
          label={'Permissions'}
          options={[
            {
              key: 'admin',
              value: 'admin',
            },
            {
              key: 'user',
              value: 'user',
            },
          ]}
        />
        <BaseSelect fullWidth label={'Machines response'} options={[]} />
        <BaseSelect fullWidth label={'Products responsible'} options={[]} />
      </Box>
    </BaseModal>
  );
};
