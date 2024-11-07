'use client';

import { MainLayout } from '@/ui/templates/MainLayout';
import { AdvertisingTemplate } from '@/ui/templates/AdvertisingTemplate';
import { GlobalFilters } from '@/ui/organisms/GlobalFilters';

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
