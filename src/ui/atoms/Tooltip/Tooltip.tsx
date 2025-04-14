import { PropsWithChildren, useLayoutEffect, useState } from 'react';
import { Box, Popper } from '@mui/material';

type Props = PropsWithChildren<{
  open: boolean;
  anchor: HTMLElement | null;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}>;

export const Tooltip = (props: Props) => {
  const { open, anchor, children, onMouseEnter, onMouseLeave } = props;

  const [placement, setPlacement] = useState<'top' | 'bottom'>('top');

  useLayoutEffect(() => {
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();

    setPlacement(rect.top > 150 ? 'top' : 'bottom');
  }, [open, anchor]);

  return (
    <div>
      <Popper
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        sx={{ zIndex: 1000 }}
        disablePortal
        open={open}
        anchorEl={anchor}
        placement={placement}>
        <Box
          sx={{
            p: '10px 16px',
            borderRadius: '10px',
            background: 'var(--slate-000)',
            border: '1px solid var(--slate-200)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',

            '&::after': {
              content: '""',
              width: 10,
              height: 10,
              position: 'absolute',
              bottom: placement === 'top' ? -5.5 : 'auto',
              top: placement === 'bottom' ? -5.5 : 'auto',
              left: 'auto',
              right: 'auto',
              transform:
                placement === 'top' ? 'rotate(45deg)' : 'rotate(-45deg)',
              background: 'var(--slate-000)',
              borderRight: '1px solid var(--slate-200)',
              borderBottom: '1px solid var(--slate-200)',
            },
          }}>
          {children}
        </Box>
      </Popper>
    </div>
  );
};
