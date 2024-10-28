'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Box, Drawer, List, useMediaQuery, useTheme } from '@mui/material';
import AccountIcon from '@/assets/icons/Person.svg';
import { links } from '../data/links';
import { NavLink } from './NavLink';
import { NavHeader } from './NavHeader';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('desktop'));
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <Drawer
      variant={'permanent'}
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          color: 'var(--slate-000) !important',
          background: 'var(--slate-900)',
          width: open ? (isMobile ? '100%' : 280) : isTablet ? 0 : 64,
          overflowX: 'hidden',
          transition: 'width 0.3s',
        },
      }}>
      <List
        disablePadding
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}>
        <Box>
          <NavHeader open={open} setOpen={setOpen} />

          {links.map(({ title, href, Icon }) => (
            <NavLink
              key={title}
              title={title}
              href={href}
              open={open}
              current={href === pathname}
              icon={<Icon width={16} height={16} />}
            />
          ))}
        </Box>

        <NavLink
          title={'John Doe'}
          href={'/'}
          open={open}
          icon={<AccountIcon width={16} height={16} />}
        />
      </List>
    </Drawer>
  );
};
