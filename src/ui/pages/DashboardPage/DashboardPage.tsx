'use client';

import { MainLayout } from '@/ui/templates/MainLayout';
import { DashboardTemplate } from '@/ui/templates/DashboardTemplate';
import { GlobalFilters } from '@/ui/organisms/GlobalFilters';

export const DashboardPage = () => {
  return (
    <MainLayout title={'Dashboard'} gap={2} actions={<GlobalFilters />}>
      <DashboardTemplate />
    </MainLayout>
  );
};
