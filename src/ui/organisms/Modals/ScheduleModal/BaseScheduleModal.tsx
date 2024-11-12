import { Box, Stack, Typography } from '@mui/material';
import InfoIcon from '@/assets/icons/Info.svg';
import CircleIcon from '@/assets/icons/Circle.svg';
import { BaseModal, ModalProps } from '@/ui/molecules/BaseModal';
import { Button } from '@/ui/atoms/Button';
import { ScheduleLevel } from './types';
import { RadioButton } from './RadioButton';

type Props = {
  onRemove?: () => void;
  currentScheduleLevel?: ScheduleLevel;
} & ModalProps;

export const BaseScheduleModal = (props: Props) => {
  const { currentScheduleLevel, onClose, onConfirm, onRemove } = props;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <BaseModal
      onClose={onClose}
      // TODO replace with tab item
      title={
        <>
          Schedule this report{' '}
          {currentScheduleLevel ? <Box>{currentScheduleLevel}</Box> : null}
        </>
      }
      actionButtons={
        <>
          <Button
            startIcon={<CircleIcon />}
            variant={'outlined'}
            onClick={onClose}>
            Close
          </Button>

          <Button variant={'contained'} onClick={handleConfirm}>
            Confirm
          </Button>
        </>
      }
      additionalButtons={
        onRemove ? (
          <Button onClick={onRemove} variant={'outlined'} color={'secondary'}>
            Remove schedule
          </Button>
        ) : null
      }>
      <Stack spacing={3} sx={{maxWidth: 450}}>
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            p: 1.5,
            borderRadius: 1,
            color: 'var(--sky-500)',
            backgroundColor: 'var(--sky-050)',
          }}>
          <InfoIcon width={16} height={16} />

          <Typography
            variant={'sm-regular'}
            sx={{
              color: 'var(--slate-900)',
              lineHeight: '21px',
            }}>
            <Typography variant={'sm-medium'}>Note: </Typography>This e-mail
            report is sent at midnight (24:00) and refers to the data selected.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {['Monthly', 'Quarterly', 'Bi-Anually', 'Anually'].map((item) => (
            <RadioButton key={item} value={item} checked={item === 'Monthly'} />
          ))}
        </Box>
      </Stack>
    </BaseModal>
  );
};
