import { PropsWithChildren } from 'react';
import { Box, Typography } from '@mui/material';
import { LinkTabs } from '@/app/admin/LinkTabs';

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant={'lg-medium'}>Admin panel</Typography>

        <Box>
          <LinkTabs
            links={[
              { title: 'Account', to: '/admin' },
              { title: 'Partner Management', to: '/admin/partner-management' },
              { title: 'History', to: '/admin/history' },
            ]}
          />
        </Box>
      </Box>
      {children}
    </Box>
  );
}
