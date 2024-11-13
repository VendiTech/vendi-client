'use client'

import { GlobalFilters } from '@/lib/services/GlobalFilters';
import { MainLayout } from '@/ui/templates/MainLayout';
import { SalesTemplate } from '@/ui/templates/SalesTemplate';

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
