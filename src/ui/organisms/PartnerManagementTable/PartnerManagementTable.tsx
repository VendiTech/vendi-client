import { Typography } from '@mui/material';
import { useGetUsers } from '@/lib/api';
import { createTableProps, DataTable } from '@/ui/organisms/DataTable';
import { useUpdateLoginModal } from './modals/UpdateLoginModal';
import { useDeleteUserModal } from './modals/DeleteLoginModal';
import { useResetPasswordModal } from './modals/ResetPasswordModal';

type Props = {
  variant?: 'accounts' | 'partner management';
};

export const PartnerManagementTable = ({
  variant = 'partner management',
}: Props) => {
  const { data } = useGetUsers();

  const partners = data?.data.items ?? [];

  const tableData = partners.map((item) => ({
    ...item,
    id: String(item.id),
    name: `${item.firstname} ${item.lastname}`,
    functions: item.role,
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
      variant === 'partner management'
        ? { field: 'email', title: 'Email' }
        : null,
      variant === 'accounts' ? { field: 'id', title: 'User ID' } : null,
      variant === 'accounts' ? { field: 'functions', title: 'Function' } : null,
      {
        field: 'permissions',
        title: 'Permissions',
        render: (user: (typeof tableData)[0]) => user.permissions.join(', '),
      },
      variant === 'partner management'
        ? {
            field: 'machines',
            title: 'Machines',
            render: (user: (typeof tableData)[0]) => (
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
          }
        : null,
    ].filter(Boolean) as Parameters<typeof createTableProps>[0]['columns'],
    menuActions: [
      { name: 'Edit', fn: updateLogin },
      { name: 'Reset password', fn: resetPassword },
      { name: 'Delete', fn: deleteUser, critical: true },
    ],
  });

  return <DataTable {...tableProps} />;
};
