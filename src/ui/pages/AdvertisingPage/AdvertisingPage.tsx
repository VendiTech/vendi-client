'use client';

import { MainLayout } from '@/ui/templates/MainLayout';
import { DashboardFilters } from '@/ui/organisms/DashboardFilters';
import { AdvertisingTemplate } from '@/ui/templates/AdvertisingTemplate';

export const AdvertisingPage = () => {
  return (
    <MainLayout
      title={'Advertising'}
      gap={2}
      actions={<DashboardFilters />}>
      <AdvertisingTemplate />
    </MainLayout>
  );
};
