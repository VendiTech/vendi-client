import { Dispatch, SetStateAction } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import OpenIcon from '@/assets/icons/Bars.svg';
import LogoIcon from '@/assets/icons/LogoIcon.svg';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const NavHeader = (props: Props) => {
  const { open, setOpen } = props;

  return (
    <ListItem>
      <ListItemText
        sx={{
          zIndex: -1,
          opacity: open ? 1 : 0,
        }}>
        <LogoIcon width={32} height={32} />
      </ListItemText>

      <ListItemIcon onClick={() => setOpen((prevState) => !prevState)}>
        <OpenIcon width={16} height={16} />
      </ListItemIcon>
    </ListItem>
  );
};
