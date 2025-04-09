import {
  FC,
  Fragment,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
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
import CrossIcon from '@/assets/icons/Cross.svg';
import { Card } from '@/ui/atoms/Card';
import { ModalProps } from './types';

export type Props<T> = {
  title: ReactNode;
  actionButtons: ReactNode;
  additionalButtons?: ReactNode;
  Wrapper?: FC<T & PropsWithChildren>;
  wrapperProps: T;
  titleMargin?: 'small' | 'large';
  sx?: SxProps<Theme>;
  icon?: ReactNode;
} & PropsWithChildren &
  Omit<ModalProps, 'onConfirm'>;

const buttonsBoxSx: SxProps<Theme> = {
  display: 'flex',
  gap: '8px',
  justifyContent: 'space-between',
};

export const BaseModal = <T,>(props: Props<T>) => {
  const {
    title,
    children,
    actionButtons,
    additionalButtons,
    onClose,
    titleMargin,
    Wrapper,
    wrapperProps,
    sx,
    icon,
  } = props;

  const dialogContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const firstInput = dialogContentRef.current?.querySelector('input');
      firstInput?.focus();
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  const WrapperComponent = Wrapper && wrapperProps ? Wrapper : Fragment;

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
      <WrapperComponent {...wrapperProps}>
        <Card sx={{ minWidth: '500px', overflowY: 'auto' }} padding={'large'}>
          <DialogTitle
            sx={{
              p: 0,
              pb: titleMargin === 'large' ? 2 : 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Box
              sx={{
                gap: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {icon}
              
              <Typography
                variant={'lg-medium'}
                sx={{
                  display: 'flex',
                  gap: '8px',
                  width: 'fit-content',
                }}>
                {title}
              </Typography>
            </Box>

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

          <DialogActions sx={{ p: 0, ...buttonsBoxSx }}>
            <Box sx={buttonsBoxSx}>{additionalButtons}</Box>
            <Box sx={buttonsBoxSx}>{actionButtons}</Box>
          </DialogActions>
        </Card>
      </WrapperComponent>
    </Dialog>
  );
};
