import { useState } from 'react';
import { Box, Drawer, List } from '@mui/material';
import DashboardIcon from '@/assets/icons/Grid.svg';
import SalesIcon from '@/assets/icons/BadgeDollar.svg';
import AdvertisingIcon from '@/assets/icons/Bullhorn.svg';
import ComparisonIcon from '@/assets/icons/ChartSimple.svg';
import ExportIcon from '@/assets/icons/ExportFilled.svg';
import AccountIcon from '@/assets/icons/Person.svg';
import { NavLink } from './NavLink';
import { NavHeader } from './NavHeader';

const list = [
  { title: 'Dashboard', Icon: DashboardIcon },
  { title: 'Sales', Icon: SalesIcon },
  { title: 'Advertising', Icon: AdvertisingIcon },
  { title: 'Comparison', Icon: ComparisonIcon },
  { title: 'Export', Icon: ExportIcon },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer
      variant={'permanent'}
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          width: open ? 280 : 64,
          overflowX: 'hidden',
          transition: 'width 0.3s',
        },
      }}>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}>
        <Box>
          <NavHeader open={open} setOpen={setOpen} />

          {list.map(({ title, Icon }) => (
            <NavLink
              key={title}
              title={title}
              open={open}
              icon={<Icon width={16} height={16} />}
            />
          ))}
        </Box>

        <NavLink
          title={'John Doe'}
          open={open}
          icon={<AccountIcon width={16} height={16} />}
        />
      </List>
    </Drawer>
  );
};
