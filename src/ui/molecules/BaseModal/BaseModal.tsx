import { PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { Card } from '@/ui/atoms/Card';
import CrossIcon from '@/assets/icons/Cross.svg';
import { ModalProps } from './types';

export type Props = {
  title: ReactNode;
  actionButtons: ReactNode;
  additionalButtons?: ReactNode;
  titleMargin?: 'small' | 'large';
  sx?: SxProps<Theme>;
} & PropsWithChildren &
  Omit<ModalProps, 'onConfirm'>;

const buttonsBoxSx: SxProps<Theme> = {
  display: 'flex',
  gap: '8px',
  justifyContent: 'space-between',
};

export const BaseModal = (props: Props) => {
  const {
    title,
    children,
    actionButtons,
    additionalButtons,
    onClose,
    titleMargin,
    sx,
  } = props;

  const dialogContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const firstInput = dialogContentRef.current?.querySelector('input');
      firstInput?.focus();
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Dialog
      onClose={onClose}
      open={true}
      disableEnforceFocus
      disableAutoFocus
      sx={{
        '&[aria-hidden=true]:has(+ .MuiDialog-root)': {
          visibility: 'hidden',
        },
        '& .MuiDialog-container > .MuiPaper-root': {
          background: 'transparent',
        },
        ...sx,
      }}>
      <Card sx={{ minWidth: '500px' }} padding={'large'}>
        <DialogTitle
          sx={{
            p: 0,
            pb: titleMargin === 'large' ? '24px' : '8px',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Typography
            variant={'lg-medium'}
            sx={{
              display: 'flex',
              gap: '8px',
              width: 'fit-content',
            }}>
            {title}
          </Typography>

          <IconButton
            onClick={onClose}
            sx={{
              m: '-8px',
              color: 'var(--slate-600)',
            }}>
            <CrossIcon width={14} height={14} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }} ref={dialogContentRef}>
          {children}
        </DialogContent>

        <DialogActions sx={{ p: 0, pt: '24px', ...buttonsBoxSx }}>
          <Box sx={buttonsBoxSx}>{additionalButtons}</Box>
          <Box sx={buttonsBoxSx}>{actionButtons}</Box>
        </DialogActions>
      </Card>
    </Dialog>
  );
};
