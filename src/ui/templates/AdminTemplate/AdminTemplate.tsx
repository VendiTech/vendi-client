import { PropsWithChildren } from 'react';
import { MainLayout } from '@/ui/templates/MainLayout';

export const AdminTemplate = ({ children }: PropsWithChildren) => {
  return <MainLayout title={'Admin panel'}>{children}</MainLayout>;
};
