import { useGetUsers } from '@/lib/api';
import { createTableProps, DataTable } from '@/ui/organisms/DataTable';
import {
  useDeleteUserModal,
  useResetPasswordModal,
} from '@/ui/organisms/Modals';
import { useUpdateLoginModal } from './modals/UpdateLoginModal';

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
      onConfirm: () => {
        console.log('user deleted ' + partner.id);
        onDeleteFinished?.();
      },
      username: '',
    });
  };

  const resetPassword = (onResetFinished?: () => void) =>
    openResetPasswordModal({
      onConfirm: () => onResetFinished?.(),
    });

  const updateLogin = (id: string) => {
    const partner = partners.find((item) => String(item.id) === id);

    if (!partner || Number.isNaN(+id)) return;

    openUpdateLoginModal({
      userId: +id,
      defaultValues: partner,
      onConfirm: () => closeUpdateModal(),
      onDelete: () => deleteUser(id, closeUpdateModal),
      onResetPassword: () => resetPassword(closeUpdateModal),
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
        render: (user) => user.machines.map((item) => item.name).join(', '),
      },
    ],
    menuActions: [
      { name: 'Edit', fn: updateLogin },
      { name: 'Reset password', fn: () => resetPassword() },
      { name: 'Delete', fn: deleteUser, critical: true },
    ],
  });

  return <DataTable {...tableProps} />;
};
