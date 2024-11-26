import { Typography } from '@mui/material';
import { useGetUsers } from '@/lib/api';
import { createTableProps, DataTable } from '@/ui/organisms/DataTable';
import { useUpdateLoginModal } from './modals/UpdateLoginModal';
import { useDeleteUserModal } from './modals/DeleteLoginModal';
import { useResetPasswordModal } from './modals/ResetPasswordModal';

export const PartnerManagementTable = () => {
  const { data } = useGetUsers();

  const partners = data?.data.items ?? [];

  const tableData = partners.map((item) => ({
    ...item,
    id: String(item.id),
    name: `${item.firstname} ${item.lastname}`,
  }));

  const [openDeleteConfirmationModal] = useDeleteUserModal();
  const [openResetPasswordModal] = useResetPasswordModal();
  const [openUpdateLoginModal, closeUpdateModal] = useUpdateLoginModal();

  const deleteUser = (id: string, onDeleteFinished?: () => void) => {
    const partner = partners.find((item) => String(item.id) === id);

    if (!partner) return;

    openDeleteConfirmationModal({
      userId: +partner.id,
      username: `${partner.firstname} ${partner.lastname}`,
      onConfirm: () => onDeleteFinished?.(),
    });
  };

  const resetPassword = (id: string, onResetFinished?: () => void) => {
    const partner = partners.find((item) => String(item.id) === id);

    if (!partner) return;

    openResetPasswordModal({
      userId: +partner.id,
      username: `${partner.firstname} ${partner.lastname}`,
      onConfirm: () => onResetFinished?.(),
    });
  };

  const updateLogin = (id: string) => {
    const partner = partners.find((item) => String(item.id) === id);

    if (!partner) return;

    openUpdateLoginModal({
      userId: +id,
      defaultValues: partner,
      onConfirm: () => closeUpdateModal(),
      onDelete: () => deleteUser(id, closeUpdateModal),
      onResetPassword: () => resetPassword(id, closeUpdateModal),
    });
  };

  const tableProps = createTableProps({
    data: tableData,
    columns: [
      { field: 'name', title: 'Name' },
      { field: 'email', title: 'Email' },
      {
        field: 'permissions',
        title: 'Permissions',
        render: (user) => user.permissions.join(', '),
      },
      {
        field: 'machines',
        title: 'Machines',
        render: (user) => (
          <Typography
            sx={{
              fontSize: 'inherit',
              textWrap: 'nowrap',
              overflow: 'hidden',
              maxWidth: 300,
              textOverflow: 'ellipsis',
            }}>
            {user.machines.map((item) => item.name).join(', ')}
          </Typography>
        ),
      },
    ],
    menuActions: [
      { name: 'Edit', fn: updateLogin },
      { name: 'Reset password', fn: resetPassword },
      { name: 'Delete', fn: deleteUser, critical: true },
    ],
  });

  return <DataTable {...tableProps} />;
};
