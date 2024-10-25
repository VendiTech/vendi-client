'use client';

import { Box, Typography } from '@mui/material';
import { partners } from '@/assets/mocks/partners';
import {
  useDeleteUserModal,
  useEditLoginModal,
  useResetPasswordModal,
} from '@/ui/organisms/Modals';
import { createTableProps, DataTable } from '@/ui/organisms/DataTable';

export const PartnerManagementTemplate = () => {
  const [openDeleteConfirmationModal] = useDeleteUserModal();
  const [openResetPasswordModal] = useResetPasswordModal();
  const [openEditLoginModal, closeEditModal] = useEditLoginModal();

  const deleteUser = (id: string, onDeleteFinished?: () => void) => {
    const partner = partners.find((item) => item.id === id);

    if (!partner) return;

    openDeleteConfirmationModal({
      onConfirm: () => {
        console.log('user deleted ');
        onDeleteFinished?.();
      },
      username: partner.name,
    });
  };

  const resetPassword = (onResetFinished?: () => void) =>
    openResetPasswordModal({
      onConfirm: () => onResetFinished?.(),
    });

  const editLogin = (id: string) => {
    const partner = partners.find((item) => item.id === id);

    if (!partner) return;

    openEditLoginModal({
      onConfirm: () => console.log('login changed ' + partner.id),
      onDelete: () => deleteUser(id, closeEditModal),
      onResetPassword: () => resetPassword(closeEditModal),
    });
  };

  const tableProps = createTableProps({
    data: partners,
    columns: [
      { field: 'name', title: 'Name' },
      { field: 'email', title: 'Email' },
      { field: 'permissions', title: 'Permissions' },
      { field: 'machines', title: 'Machines' },
      { field: 'products', title: 'Products' },
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 3,
        gap: 3,
      }}>
      <DataTable {...tableProps} />
    </Box>
  );
};
