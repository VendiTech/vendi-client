'use client';

import { Stack, Typography } from '@mui/material';
import { PartnerManagementTable } from '@/ui/organisms/PartnerManagementTable';
import { Card } from '@/ui/atoms/Card';

export const PartnerManagementTemplate = () => {
  return (
    <Stack spacing={3} sx={{ mt: 3 }}>
      <Card>
        <Typography variant={'lg-medium'} sx={{ pl: 1 }}>
          Partners
        </Typography>

        <PartnerManagementTable />
      </Card>
    </Stack>
  );
};
