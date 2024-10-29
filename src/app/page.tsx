'use client';

import { MainLayout } from '@/ui/templates/MainLayout';
import { Banner } from '@/ui/organisms/Banner';

export default function Home() {
  return (
    <MainLayout title={'Dashboard'}>
      <Banner />
    </MainLayout>
  );
}
