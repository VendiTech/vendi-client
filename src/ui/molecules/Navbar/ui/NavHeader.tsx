import { Dispatch, SetStateAction, MouseEvent } from 'react';
import {
  AppBar,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import OpenIcon from '@/assets/icons/Bars.svg';
import BurgerIcon from '@/assets/icons/Burger.svg';
import LogoIcon from '@/assets/icons/LogoIcon.svg';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const NavHeaderInner = (props: Props) => {
  const { open, setOpen } = props;

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('desktop'));

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setOpen((prevState) => !prevState);
  };

  return (
    <ListItem
      sx={{
        m: isTablet ? 0 : 1,
        width: isTablet ? '100%' : open ? 264 : 48,
        height: isTablet ? 48 : 64,
        display: 'flex',
        flexDirection: isTablet ? 'row-reverse' : 'row',
        justifyContent: 'space-between',
      }}>
      {isTablet ? <Box width={16} /> : null}

      <ListItemText
        sx={{
          zIndex: -1,
          opacity: open ? 1 : 0,
          flexGrow: isTablet ? 0 : 1,

          '& .MuiTypography-root': {
            display: 'flex',
            alignItems: 'center',
          },
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
        <Box
          sx={{
            transform: open ? 'none' : 'rotate(180deg)',
            display: 'flex',
            alignItems: 'center',
          }}>
          {isTablet ? (
            <BurgerIcon width={16} height={16} />
          ) : (
            <OpenIcon width={16} height={16} />
          )}
        </Box>
      </ListItemIcon>
    </ListItem>
  );
};

export const NavHeader = (props: Props) => {
  const { open, setOpen } = props;

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('desktop'));

  return isTablet ? (
    <>
      <Box sx={{ height: 48 }} />
      <AppBar
        sx={{
          background: 'var(--slate-900)',
          boxShadow: 'none',
        }}>
        <NavHeaderInner open={true} setOpen={setOpen} />
      </AppBar>
    </>
  ) : (
    <NavHeaderInner open={open} setOpen={setOpen} />
  );
};
