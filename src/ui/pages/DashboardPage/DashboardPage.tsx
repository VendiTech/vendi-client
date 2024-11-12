'use client';

// import { useGetSales } from '@/lib/api';
import { MainLayout } from '@/ui/templates/MainLayout';
import { DashboardTemplate } from '@/ui/templates/DashboardTemplate';
import { GlobalFilters, useGlobalFilters } from '@/ui/organisms/GlobalFilters';

export const DashboardPage = () => {
  const { dateFrom, dateTo } = useGlobalFilters();

  // const { data } = useGetSales({ dateFrom, dateTo });
  // const { data: fullData } = useGetSales();

  return (
    <MainLayout title={'Dashboard'} gap={2} actions={<GlobalFilters />}>
      <DashboardTemplate />
    </MainLayout>
  );
};
