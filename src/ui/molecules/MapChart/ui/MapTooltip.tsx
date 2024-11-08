import * as React from 'react';
import { Box, Popper, Typography } from '@mui/material';
import { useLayoutEffect, useState } from 'react';

type Props = {
  open: boolean;
  anchor: null | HTMLElement;
  value: number;
  region: string;
};

export const MapTooltip = (props: Props) => {
  const { open, anchor, value, region } = props;

  const [placement, setPlacement] = useState<'top' | 'bottom'>('top');

  useLayoutEffect(() => {
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();

    setPlacement(rect.top > 150 ? 'top' : 'bottom');
  }, [open, anchor]);

  return (
    <div>
      <Popper
        disablePortal
        open={open}
        anchorEl={anchor}
        placement={placement}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, placement === 'top' ? 10 : 0],
            },
          },
        ]}>
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
          <Typography
            variant={'base-medium'}
            color={'var(--slate-900)'}
            lineHeight={1.5}>
            {value}
          </Typography>

          <Typography
            variant={'xs-regular'}
            color={'var(--slate-500)'}
            lineHeight={1.5}>
            {region}
          </Typography>
        </Box>
      </Popper>
    </div>
  );
};
