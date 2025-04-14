import { useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { MachineDetailSchema, ProductDetailSchema } from '@/lib/generated/api';
import { Tooltip } from '@/ui/atoms/Tooltip';

type Props = {
  items: MachineDetailSchema[] | ProductDetailSchema[];
};

export const PartnerManagementDetails = ({ items }: Props) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setOpen(!!items.length);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <>
      <Typography
        ref={anchorRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          textAlign: 'center',
          fontSize: 'inherit',
          textWrap: 'nowrap',
          overflow: 'hidden',
          maxWidth: 180,
          textOverflow: 'ellipsis',
          cursor: 'pointer',
        }}>
        {items.length}
      </Typography>

      <Tooltip
        anchor={anchorRef.current}
        open={open}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <Box
          sx={{
            p: 1,
            maxHeight: 200,
            overflowY: 'auto',
            display: 'flex',
            gap: 2,
            flexDirection: 'column',
          }}>
          {items.map((item) => (
            <Typography key={item.id} variant="sm-regular">
              {item.name}
            </Typography>
          ))}
        </Box>
      </Tooltip>
    </>
  );
};
