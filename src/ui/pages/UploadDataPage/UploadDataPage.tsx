'use client';

import { MainLayout } from '@/ui/templates/MainLayout';
import { BasicTab } from '@/ui/atoms/Tabs';
import { useRef } from 'react';
import { Box } from '@mui/material';
import { UploadVendingTemplate } from '@/ui/templates/UploadVendingTemplate';
// import { useGetAccountData } from '@/lib/api';
// import { RoleEnum } from '@/lib/generated/api';
// import { Routes } from '@/lib/constants/routes';
// import { useRouter } from 'next/navigation';

export const UploadDataPage = () => {
  const tabsLabelsContainerRef = useRef<HTMLDivElement>(null);

  // TODO admin role guard
  // const router = useRouter();
  // const { data: user, isLoading: isUserLoading } = useGetAccountData();
  //
  // const userRole = user?.data.role;
  //
  // if (!isUserLoading && userRole !== RoleEnum.Admin) {
  //   router.push(Routes.Dashboard);
  // }

  return (
    <MainLayout
      title={'Upload Excel data'}
      actions={<Box ref={tabsLabelsContainerRef} />}>
      <BasicTab
        tabLabels={['Vending']}
        tabLabelsContainer={tabsLabelsContainerRef}
        tabComponents={[
          <UploadVendingTemplate key={1} />,
        ]}
      />
    </MainLayout>
  );
};
