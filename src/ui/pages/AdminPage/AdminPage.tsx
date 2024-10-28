'use client';

import { Box } from '@mui/material';
import ExportIcon from '@/assets/icons/Export.svg';
import { AccountsTemplate } from '@/ui/templates/AccountsTemplate/AccountsTemplate';
import { PartnerManagementTemplate } from '@/ui/templates/PartnersManagementTemplate';
import { HistoryTemplate } from '@/ui/templates/HistoryTemplate';
import { MainLayout } from '@/ui/templates/MainLayout';
import { MenuButton } from '@/ui/molecules/MenuButton';
import { BasicTab } from '@/ui/atoms/Tabs';
import { Button } from '@/ui/atoms/Button';

export const AdminPage = () => {
  return (
    <MainLayout title={'Admin panel'}>
      <BasicTab
        tabLabels={['Accounts', 'Partner Management', 'History']}
        tabComponents={[
          <AccountsTemplate key={1} />,
          <PartnerManagementTemplate key={2} />,
          <HistoryTemplate key={3} />,
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
    </MainLayout>
  );
};