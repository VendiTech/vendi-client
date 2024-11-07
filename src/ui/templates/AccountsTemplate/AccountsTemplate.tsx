'use client';

import { Box, Typography } from '@mui/material';
import { parseDate } from '@/lib/helpers/parse-date';
import { accounts } from '@/assets/mocks/accounts';
import {
  useDeleteUserModal,
  useEditLoginModal,
  useResetPasswordModal,
} from '@/ui/organisms/Modals';
import { Activity } from '@/ui/organisms/Activity';
import { AccountInfo } from '@/ui/organisms/AccountInfo';
import { createTableProps, DataTable } from '@/ui/organisms/DataTable';
import { Card } from '@/ui/atoms/Card';

export const AccountsTemplate = () => {
  const users = accounts.map((item) => ({
    ...item,
    id: item.userId,
  }));

  const [openDeleteConfirmationModal] = useDeleteUserModal();
  const [openResetPasswordModal] = useResetPasswordModal();
  const [openEditLoginModal, closeEditModal] = useEditLoginModal();

  const deleteUser = (id: string, onDeleteFinished?: () => void) => {
    const user = users.find((item) => item.id === id);

    if (!user) return;

    openDeleteConfirmationModal({
      onConfirm: () => {
        console.log('user deleted ' + user.userId);
        onDeleteFinished?.();
      },
      username: user.name,
    });
  };

  const resetPassword = (onResetFinished?: () => void) =>
    openResetPasswordModal({
      onConfirm: () => onResetFinished?.(),
    });

  const editLogin = (id: string) => {
    const user = users.find((item) => item.id === id);

    if (!user) return;

    openEditLoginModal({
      onConfirm: () => console.log('login changed ' + user.userId),
      onDelete: () => deleteUser(id, closeEditModal),
      onResetPassword: () => resetPassword(closeEditModal),
    });
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        mt: 3,
      }}>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ flex: '1 1 688px' }}>
          <AccountInfo />
        </Box>

        <Box sx={{ flex: '1 1 336px' }}>
          <Activity />
        </Box>
      </Box>

      <Card>
        <Typography variant={'lg-medium'} sx={{ pl: 1 }}>
          Accounts
        </Typography>

        <DataTable {...tableProps} />
      </Card>
    </Box>
  );
};
