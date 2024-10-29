import { Dispatch, MouseEvent, SetStateAction } from 'react';
import {
  AppBar,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
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

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setOpen((prevState) => !prevState);
  };

  return (
    <ListItem
      sx={{
        m: {
          desktop: 1,
          mobile: 0,
        },
        width: {
          mobile: '100%',
          desktop: open ? 264 : 48,
        },
        maxWidth: '100%',
        height: {
          mobile: 48,
          desktop: 64,
        },
        display: 'flex',
        flexDirection: {
          mobile: 'row-reverse',
          desktop: 'row',
        },
        justifyContent: 'space-between',
      }}>
      <Box sx={{ width: 16, display: { mobile: 'block', desktop: 'none' } }} />

      <ListItemText
        sx={{
          zIndex: -1,
          opacity: open ? 1 : 0,
          flexGrow: {
            mobile: 0,
            desktop: 1,
          },

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
          <Box
            sx={{
              display: {
                mobile: 'flex',
                desktop: 'none',
                alignItems: 'center',
              },
            }}>
            <BurgerIcon width={16} height={16} />
          </Box>

          <Box
            sx={{
              display: {
                mobile: 'none',
                desktop: 'flex',
                alignItems: 'center',
              },
            }}>
            <OpenIcon width={16} height={16} />
          </Box>
        </Box>
      </ListItemIcon>
    </ListItem>
  );
};

export const NavHeader = (props: Props) => {
  const { open, setOpen } = props;

  return (
    <>
      <Box sx={{ height: 48, display: { mobile: 'block', desktop: 'none' } }}>
        <AppBar
          sx={{
            width: '100vw',
            left: 0,
            background: 'var(--slate-900)',
            boxShadow: 'none',
          }}>
          <NavHeaderInner open={true} setOpen={setOpen} />
        </AppBar>
      </Box>

      <Box sx={{ display: { mobile: 'none', desktop: 'block' } }}>
        <NavHeaderInner open={open} setOpen={setOpen} />
      </Box>
    </>
  );
};
