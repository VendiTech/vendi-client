import { Typography } from '@mui/material';
import { createModalHook } from '@/lib/services/Modals';
import { ModalProps } from '@/ui/molecules/BaseModal';
import { BaseConfirmationModal } from './BaseConfirmationModal';

export const RemoveScheduleModal = (props: ModalProps) => {
  return (
    <BaseConfirmationModal
      {...props}
      confirmButtonText={'Yes, remove schedule'}>
      <Typography variant={'sm-regular'} sx={{ color: 'var(--slate-500)' }}>
        Schedule will be removed. This action is irreversible.
      </Typography>
    </BaseConfirmationModal>
  );
};

export const useRemoveScheduleModal = createModalHook<ModalProps>((props) => (
  <RemoveScheduleModal {...props} />
));
