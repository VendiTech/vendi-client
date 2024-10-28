import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { Box, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import OpenIcon from '@/assets/icons/Bars.svg';
import LogoIcon from '@/assets/icons/LogoIcon.svg';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const NavHeader = (props: Props) => {
  const { open, setOpen } = props;

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setOpen((prevState) => !prevState);
  };

  return (
    <ListItem
      sx={{
        m: 1,
        width: open ? 264 : 48,
      }}>
      <ListItemText
        sx={{
          zIndex: -1,
          opacity: open ? 1 : 0,
        }}>
        <LogoIcon width={32} height={32} />
      </ListItemText>

      <ListItemIcon
        sx={{
          color: 'inherit',
          minWidth: 'auto',
          display: 'flex',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        onClick={handleClick}>
        <Box sx={{ transform: open ? 'none' : 'rotate(180deg)' }}>
          <OpenIcon width={16} height={16} />
        </Box>
      </ListItemIcon>
    </ListItem>
  );
};
