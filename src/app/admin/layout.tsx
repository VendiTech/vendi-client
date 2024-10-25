import { PropsWithChildren } from 'react';
import { LinkTabs } from '@/ui/molecules/Tabs';
import { MainLayout } from '@/ui/templates/MainLayout';

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <MainLayout
      title={'Admin panel'}
      actions={
        <LinkTabs
          links={[
            { title: 'Account', to: '/admin' },
            { title: 'Partner Management', to: '/admin/partner-management' },
            { title: 'History', to: '/admin/history' },
          ]}
        />
      }>
      {children}
    </MainLayout>
  );
}
