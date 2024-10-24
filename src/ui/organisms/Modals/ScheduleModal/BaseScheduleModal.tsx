import { Box, Typography } from '@mui/material';
import InfoIcon from '@/assets/icons/Info.svg';
import CircleIcon from '@/assets/icons/Circle.svg';
import { BaseModal, ModalProps } from '@/ui/molecules/BaseModal';
import { Button } from '@/ui/atoms/Button';
import { ScheduleLevel } from './types';
import { RadioButton } from '@/ui/organisms/Modals/ScheduleModal/RadioButton';

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
      titleMargin={'large'}
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
      <Box>
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
            p: '12px',
            mb: '24px',
            borderRadius: '8px',
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

        <Box sx={{ display: 'flex', gap: '8px', width: 'fit-content' }}>
          {['Monthly', 'Quarterly', 'Bi-Anually', 'Anually'].map((item) => (
            <RadioButton key={item} value={item} checked={item === 'Monthly'} />
          ))}
        </Box>
      </Box>
    </BaseModal>
  );
};
