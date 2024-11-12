'use client'

import { MainLayout } from '@/ui/templates/MainLayout';
import { SalesTemplate } from '@/ui/templates/SalesTemplate';
import { GlobalFilters } from '@/ui/organisms/GlobalFilters';

export const SalesPage = () => {
  return (
    <MainLayout
      title={'Sales'}
      gap={2}
      actions={<GlobalFilters showProductFilter />}>
      <SalesTemplate />
    </MainLayout>
  );
};
