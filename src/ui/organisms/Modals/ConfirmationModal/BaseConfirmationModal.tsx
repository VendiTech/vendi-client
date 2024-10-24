import { PropsWithChildren } from 'react';
import { BaseModal, ModalProps } from '@/ui/molecules/BaseModal';
import { Button } from '@/ui/atoms/Button';

type Props = {
  title?: string;
  closeButtonText?: string;
  confirmButtonText?: string;
} & PropsWithChildren &
  ModalProps;

export const BaseConfirmationModal = (props: Props) => {
  const {
    children,
    title = 'Are you sure?',
    closeButtonText = 'Close',
    confirmButtonText = 'Confirm',
    onClose,
    onConfirm,
  } = props;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <BaseModal
      actionButtons={
        <>
          <Button variant={'outlined'} onClick={onClose}>
            {closeButtonText}
          </Button>

          <Button
            variant={'contained'}
            color={'secondary'}
            onClick={handleConfirm}>
            {confirmButtonText}
          </Button>
        </>
      }
      onClose={onClose}
      title={title}>
      {children}
    </BaseModal>
  );
};
