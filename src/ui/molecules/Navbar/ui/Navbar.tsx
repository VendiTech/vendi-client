'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Box, Drawer, List } from '@mui/material';
import { useGetAccountData } from '@/lib/api';
import { Routes } from '@/lib/constants/routes';
import AccountIcon from '@/assets/icons/Person.svg';
import { links } from '../data/links';
import { NavLink } from './NavLink';
import { NavHeader } from './NavHeader';

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const { data } = useGetAccountData();

  return (
    <Drawer
      variant={'permanent'}
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          color: 'var(--slate-000) !important',
          background: 'var(--slate-900)',
          width: {
            mobile: open ? '100%' : 0,
            tablet: open ? 280 : 0,
            desktop: open ? 280 : 64,
          },
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
          height: '100vh',
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
          title={`${data?.data.firstname ?? ''} ${data?.data.lastname ?? ''}`}
          href={Routes.Account}
          open={open}
          icon={<AccountIcon width={16} height={16} />}
        />
      </List>
    </Drawer>
  );
};
