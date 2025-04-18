import { ReactNode } from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link } from '@/ui/atoms/Link';

type Props = {
  title: string;
  icon: ReactNode;
  href: string;
  open: boolean;
  current?: boolean;
};

export const NavLink = (props: Props) => {
  const { title, icon, href, current, open } = props;

  return (
    <ListItem
      component={Link}
      href={href}
      sx={{
        m: 1,
        width: {
          mobile: open ? 'calc(100% - 16px)' : 0,
          tablet: open ? 264 : 48,
        },
        height: 48,
        borderRadius: '10px',
        background: current ? 'var(--gradient)' : 'transparent',
        transition: 'width 0.3s',
        display: 'flex',
        gap: '10px',
      }}>
      <ListItemIcon
        sx={{
          color: 'inherit',
          minWidth: 'auto',
        }}>
        {icon}
      </ListItemIcon>

      {open ? (
        <ListItemText>
          <Typography
            sx={{
              textWrap: 'nowrap',
            }}
            variant={'sm-medium'}>
            {title}
          </Typography>
        </ListItemText>
      ) : null}
    </ListItem>
  );
};
