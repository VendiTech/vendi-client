'use client';

import { GlobalFilters } from '@/lib/services/GlobalFilters';
import { MainLayout } from '@/ui/templates/MainLayout';
import { DashboardTemplate } from '@/ui/templates/DashboardTemplate';

export const DashboardPage = () => {
  return (
    <MainLayout title={'Dashboard'} gap={2} actions={<GlobalFilters />}>
      <DashboardTemplate />
    </MainLayout>
  );
};
