'use client';

import { MainLayout } from '@/ui/templates/MainLayout';
import { ComparisonTemplate } from '@/ui/templates/ComparisonTemplate';
import { GlobalFilters } from '@/ui/organisms/GlobalFilters';

export const ComparisonPage = () => {
  return (
    <MainLayout title={'Comparison'} gap={2} actions={<GlobalFilters />}>
      <ComparisonTemplate />
    </MainLayout>
  );
};
