import { Stack, Typography } from '@mui/material';
import { parseDate } from '@/lib/helpers/parse-date';
import { accounts } from '@/assets/mocks/accounts';
import { Activity } from '@/ui/organisms/Activity';
import { AccountInfo } from '@/ui/organisms/AccountInfo';
import { createTableProps, DataTable } from '@/ui/organisms/DataTable';
import { Card } from '@/ui/atoms/Card';
import { Flexbox } from '@/ui/atoms/Flexbox';
import { LoadingContent } from '@/ui/atoms/LoadingContent';
import { useGetAccountData } from '@/lib/api';

export const AccountsTemplate = () => {
  const { data, isLoading } = useGetAccountData();

  const accountData = data?.data;

  const users = accounts.map((item) => ({
    ...item,
    id: item.userId,
  }));

  const deleteUser = (id: string, onDeleteFinished?: () => void) => {
    // const user = users.find((item) => item.id === id);
    // if (!user) return;
    // openDeleteConfirmationModal({
    //   onConfirm: () => {
    //     console.log('user deleted ' + user.userId);
    //     onDeleteFinished?.();
    //   },
    //   username: user.name,
    // });
  };

  const resetPassword = (onResetFinished?: () => void) => {};

  const editLogin = (id: string) => {
    // const user = users.find((item) => item.id === id);
    // if (!user) return;
    // openEditLoginModal({
    //   onConfirm: () => console.log('login changed ' + user.userId),
    //   onDelete: () => deleteUser(id, closeEditModal),
    //   onResetPassword: () => resetPassword(closeEditModal),
    // });
  };

  const tableProps = createTableProps({
    data: users,
    columns: [
      { field: 'name', title: 'Name', hideAt: 'desktop' },
      { field: 'userId', title: 'User ID' },
      { field: 'title', title: 'Title' },
      { field: 'function', title: 'Function' },
      { field: 'permissions', title: 'Permissions' },
      {
        field: 'lastLoggedIn',
        title: 'Last logged in',
        render: (item) => (
          <Typography sx={{ color: 'var(--slate-500)', fontSize: 'inherit' }}>
            {parseDate(item.lastLoggedIn)}
          </Typography>
        ),
      },
    ],
    menuActions: [
      { name: 'Edit', fn: editLogin },
      { name: 'Reset password', fn: () => resetPassword() },
      { name: 'Delete', fn: deleteUser, critical: true },
    ],
  });

  return (
    <Stack spacing={3} sx={{ mt: 3 }}>
      <Flexbox childrenSx={[{ flexGrow: 2 }, { flexGrow: 1 }]}>
        <LoadingContent isLoading={isLoading}>
          {accountData && <AccountInfo data={accountData} />}
        </LoadingContent>

        <Activity />
      </Flexbox>

      <Card>
        <Typography variant={'lg-medium'} sx={{ pl: 1 }}>
          Accounts
        </Typography>

        <DataTable {...tableProps} />
      </Card>
    </Stack>
  );
};
