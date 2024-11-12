'use client';

import { MainLayout } from '@/ui/templates/MainLayout';
import { DashboardTemplate } from '@/ui/templates/DashboardTemplate';
import { GlobalFilters, useGlobalFilters } from '@/ui/organisms/GlobalFilters';
import { useGetSales } from '@/lib/api';

export const DashboardPage = () => {
  const { dateFrom, dateTo } = useGlobalFilters();

  useGetSales({ dateFrom, dateTo });

  return (
    <MainLayout title={'Dashboard'} gap={2} actions={<GlobalFilters />}>
      <DashboardTemplate />
    </MainLayout>
  );
};
