'use client';

import { BasicTab } from '@/ui/atoms/Tabs/Tabs';
import { AccountsPage } from '@/ui/pages/AdminAccountsPage';
import { PartnerManagementPage } from '@/ui/pages/PartnerManagementPage';
import { HistoryPage } from '@/ui/pages/HistoryPage';
import { AdminTemplate } from '@/ui/templates/AdminTemplate/AdminTemplate';
import ExportIcon from '@/assets/icons/Export.svg';
import { MenuButton } from '@/ui/molecules/MenuButton';
import { Button } from '@/ui/atoms/Button';
import { Box } from '@mui/material';

export default function Admin() {
  return (
    <AdminTemplate>
      <BasicTab
        tabLabels={['Accounts', 'Partner Management', 'History']}
        tabComponents={[
          <AccountsPage key={1} />,
          <PartnerManagementPage key={2} />,
          <HistoryPage key={3} />,
        ]}
        additionalComponent={[
          <Box
            key={1}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 1,
            }}>
            <MenuButton
              variant={'outlined'}
              size={'small'}
              actions={[{ name: 'Refresh', fn: console.log }]}>
              Manual Refresh
            </MenuButton>

            <Button variant={'outlined'} size={'small'}>
              Automated Data Report
            </Button>

            <MenuButton
              variant={'outlined'}
              color={'secondary'}
              size={'small'}
              actions={[{ name: 'Logout', fn: console.log }]}>
              Force logout
            </MenuButton>
          </Box>,
          <Box key={2} sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button variant={'outlined'} size={'small'}>
              Create login
            </Button>
          </Box>,
          <MenuButton
            key={3}
            variant={'outlined'}
            size={'small'}
            endIcon={null}
            startIcon={<ExportIcon />}
            actions={[
              { name: 'CSV', fn: console.log },
              { name: 'Excel', fn: console.log },
            ]}>
            Export data
          </MenuButton>,
        ]}
      />
    </AdminTemplate>
  );
}
