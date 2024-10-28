import { ReactNode } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

type Props = {
  title: string;
  icon: ReactNode;
  open: boolean;
};

export const NavLink = (props: Props) => {
  const { title, icon } = props;

  return (
    <ListItem>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{title}</ListItemText>
    </ListItem>
  );
};
