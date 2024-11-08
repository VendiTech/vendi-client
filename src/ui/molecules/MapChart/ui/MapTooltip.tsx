import * as React from 'react';
import { Box, Popper, Typography } from '@mui/material';

type Props = {
  open: boolean;
  anchor: null | HTMLElement;
  value: number;
  region: string;
};

export const MapTooltip = (props: Props) => {
  const { open, anchor, value, region } = props;

  return (
    <div>
      <Popper
        disablePortal
        open={open}
        anchorEl={anchor}
        placement={'top'}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, -5],
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
              bottom: -5.5,
              left: 'auto',
              right: 'auto',
              transform: 'rotate(45deg)',
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
