import { Box } from '@mui/material';
import ArrowIcon from '@/assets/icons/SortArrow.svg';

type Props = {
  visible: boolean;
  direction: 'asc' | 'desc' | null;
};

export const SortArrow = ({ visible, direction }: Props) => {
  return (
    <Box
      component={'span'}
      sx={{
        transform: direction === 'desc' ? 'rotate(180deg)' : 'none',
        ml: '9px',
        translate: direction === 'asc' ? '0 -2px' : ' 0 2px',
        alignItems: 'center',
        visibility: visible ? 'visible' : 'hidden'
      }}>
      <ArrowIcon />
    </Box>
  );
};
