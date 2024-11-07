'use client';

import { AccountForm } from '@/ui/organisms/Forms/AccountForm';
import { MainLayout } from '@/ui/templates/MainLayout';
import { useGetAccountData } from './hooks/useGetAccountData';
import { useUpdateAccountData } from './hooks/useUpdateAccountData';

export const AccountPage = () => {
  const { data } = useGetAccountData();
  const { mutateAsync } = useUpdateAccountData();

  return (
    <MainLayout title="Account">
      {data?.data && <AccountForm data={data.data} handler={mutateAsync} />}
    </MainLayout>
  );
};
