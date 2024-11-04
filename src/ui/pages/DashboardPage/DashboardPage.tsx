'use client';

import { MainLayout } from '@/ui/templates/MainLayout';
import { DashboardTemplate } from '@/ui/templates/DashboardTemplate';
import { DashboardFilters } from '@/ui/organisms/DashboardFilters';

export const DashboardPage = () => {
  return (
    <MainLayout title={'Dashboard'} gap={2} actions={<DashboardFilters />}>
      <DashboardTemplate />
    </MainLayout>
  );
};
