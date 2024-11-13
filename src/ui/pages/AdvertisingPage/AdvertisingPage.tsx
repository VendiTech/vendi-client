'use client';

import { GlobalFilters } from '@/lib/services/GlobalFilters';
import { MainLayout } from '@/ui/templates/MainLayout';
import { AdvertisingTemplate } from '@/ui/templates/AdvertisingTemplate';

export const AdvertisingPage = () => {
  return (
    <MainLayout
      title={'Advertising'}
      gap={2}
      actions={<GlobalFilters />}>
      <AdvertisingTemplate />
    </MainLayout>
  );
};
