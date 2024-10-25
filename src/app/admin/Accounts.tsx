'use client';

import { Box, Typography } from '@mui/material';
import { parseDate } from '@/lib/helpers/parse-date';
import { accounts } from '@/assets/mocks/accounts';
import ExportIcon from '@/assets/icons/Export.svg';
import {
  useDeleteUserModal,
  useEditLoginModal,
  useResetPasswordModal,
} from '@/ui/organisms/Modals';
import { Activity } from '@/ui/organisms/Activity';
import { AccountInfo } from '@/ui/organisms/AccountInfo';
import { createTableProps, DataTable } from '@/ui/organisms/DataTable';
import { MenuButton } from '@/ui/molecules/MenuButton';
import { Button } from '@/ui/atoms/Button';

export const Accounts = () => {
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
    tableHeader: (
      <Typography variant={'h5'} sx={{ pl: 1 }}>
        Accounts
      </Typography>
    ),
  });

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Box
          sx={{
            gap: 1,
            display: 'flex',
          }}>
          <MenuButton
            variant={'outlined'}
            size={'small'}
            actions={[{ name: 'Refresh', fn: console.log }]}>
            Manual Refresh
          </MenuButton>

          <Button variant={'outlined'} size={'small'}>
            Automated Data Report
          </Button>
        </Box>

        <Box sx={{ gap: 1, display: 'flex' }}>
          <MenuButton
            variant={'outlined'}
            size={'small'}
            endIcon={null}
            startIcon={<ExportIcon />}
            actions={[
              { name: 'CSV', fn: console.log },
              { name: 'Excel', fn: console.log },
            ]}>
            Export data
          </MenuButton>

          <MenuButton
            variant={'outlined'}
            color={'secondary'}
            size={'small'}
            actions={[{ name: 'Logout', fn: console.log }]}>
            Force logout
          </MenuButton>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ flex: '1 1 688px' }}>
          <AccountInfo />
        </Box>

        <Box sx={{ flex: '1 1 336px' }}>
          <Activity />
        </Box>
      </Box>

      <DataTable {...tableProps} />
    </>
  );
};
