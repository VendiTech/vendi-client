'use client';

import { MainLayout } from '@/ui/templates/MainLayout';
import { Banner } from '@/ui/organisms/Banner';
import { BarChart } from '@/ui/atoms/BarChart';

const barChartData = [
  { label: 'Dec 4, 2023', value: 45000 },
  { label: 'Jan 11', value: 170000 },
  { label: 'Jan 21', value: 95000 },
  { label: 'Feb 4', value: 120000 },
];

export default function Home() {
  return (
    <MainLayout title={'Dashboard'}>
      <Banner />

      <BarChart
        data={barChartData}
        sx={{ height: 275 }}
        yLabelsCallback={(labelValue) =>
          `$${Math.round(+labelValue / 1000)}${labelValue !== 0 ? 'k' : ''}`
        }
      />
    </MainLayout>
  );
}
