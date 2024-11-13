'use client';

import { GlobalFilters } from '@/lib/services/GlobalFilters';
import { MainLayout } from '@/ui/templates/MainLayout';
import { ComparisonTemplate } from '@/ui/templates/ComparisonTemplate';

export const ComparisonPage = () => {
  return (
    <MainLayout title={'Comparison'} gap={2} actions={<GlobalFilters />}>
      <ComparisonTemplate />
    </MainLayout>
  );
};
