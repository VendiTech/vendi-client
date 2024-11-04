'use client';

import { MainLayout } from '@/ui/templates/MainLayout';
import { DashboardTemplate } from '@/ui/templates/DashboardTemplate';
import { BaseSelect } from '@/ui/atoms/Select';

export default function Home() {
  return (
    <MainLayout
      title={'Dashboard'}
      gap={2}
      actions={
        <>
          <BaseSelect
            options={[
              { key: 'United Kingdom', value: 'United Kingdom' },
              { key: 'Liverpool', value: 'Liverpool' },
            ]}
            value={'United Kingdom'}
          />
          <BaseSelect
            options={[
              { key: '1 month', value: '1 month' },
              { key: '1 year', value: '1 year' },
            ]}
            value={'1 month'}
          />
        </>
      }>
      <DashboardTemplate />
    </MainLayout>
  );
}
