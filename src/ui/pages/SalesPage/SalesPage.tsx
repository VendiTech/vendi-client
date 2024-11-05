'use client'

import { MainLayout } from '@/ui/templates/MainLayout';
import { GlobalFilters } from '@/ui/organisms/GlobalFilters';

export const SalesPage = () => {
  return (
    <MainLayout
      title={'Sales'}
      gap={2}
      actions={<GlobalFilters />}></MainLayout>
  );
};
