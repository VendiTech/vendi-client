'use client';

import { useGetAccountData } from '@/lib/api/hooks/useGetAccountData';
import { AccountForm } from '@/ui/organisms/Forms/AccountForms';
import { Logout } from '@/ui/organisms/Logout';
import { MainLayout } from '@/ui/templates/MainLayout';
import { useUpdateAccountData } from './hooks/useUpdateAccountData';
import { LoadingContent } from '@/ui/atoms/LoadingContent';

export const AccountPage = () => {
  const { data, isLoading } = useGetAccountData();
  const { mutateAsync, isPending } = useUpdateAccountData();

  return (
    <MainLayout title="Account" actions={<Logout />}>
      <LoadingContent isLoading={isLoading || isPending}>
        <AccountForm data={data?.data} handler={mutateAsync} />
      </LoadingContent>
    </MainLayout>
  );
};
