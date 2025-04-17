'use client';

import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { Routes } from '@/lib/constants/routes';
import { useGetAccountData } from '@/lib/api';
import { RoleEnum } from '@/lib/generated/api';
import { AccountsTemplate } from '@/ui/templates/AccountsTemplate/AccountsTemplate';
import { PartnerManagementTemplate } from '@/ui/templates/PartnersManagementTemplate';
import { HistoryTemplate } from '@/ui/templates/HistoryTemplate';
import { MainLayout } from '@/ui/templates/MainLayout';
import { useCreateLoginModal } from '@/ui/organisms/PartnerManagementTable';
import { ExportButton } from '@/ui/molecules/ExportButton';
import { BasicTab } from '@/ui/atoms/Tabs';
import { Button } from '@/ui/atoms/Button';
import { Logout } from '@/ui/organisms/Logout';
import { useExportActivity } from '@/ui/organisms/Activity';
import { RegionFilter } from '@/lib/services/GlobalFilters/ui/RegionFilter';
import { ProductFilter } from '@/lib/services/GlobalFilters/ui/ProductFIlter';

export const AdminPage = () => {
  const [openCreateLoginModal, closeCreateLoginModal] = useCreateLoginModal();

  const { mutateAsync: exportActivity } = useExportActivity();

  const router = useRouter();

  const { data: user, isLoading: isUserLoading } = useGetAccountData();

  const userRole = user?.data.role;

  if (!isUserLoading && userRole !== RoleEnum.Admin) {
    router.push(Routes.Dashboard);
  }

  if (userRole !== RoleEnum.Admin) return null;

  const createLogin = () =>
    openCreateLoginModal({
      onConfirm: closeCreateLoginModal,
    });

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
          <Logout key={1} />,

          <Box key={2} sx={{ display: 'flex', gap: 2 }}>
            <RegionFilter showLabel={false} />
            <ProductFilter showLabel={false} />
            <Button
              key={2}
              variant={'outlined'}
              size={'small'}
              onClick={createLogin}>
              Create login
            </Button>
          </Box>,

          <ExportButton key={3} onExport={exportActivity} />,
        ]}
      />
    </MainLayout>
  );
};
