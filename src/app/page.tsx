'use client';

import { MainLayout } from '@/ui/templates/MainLayout';
import { Banner } from '@/ui/organisms/Banner';
import { BarChart } from '@/ui/atoms/BarChart';

const barChartData = [
  { label: 'Dec 4, 2023', value: 45 },
  { label: 'Jan 11', value: 170 },
  { label: 'Jan 21', value: 95 },
  { label: 'Feb 4', value: 120 },
];

export default function Home() {
  return (
    <MainLayout title={'Dashboard'}>
      <Banner />

      <BarChart data={barChartData} sx={{ height: 200 }} />
    </MainLayout>
  );
}
