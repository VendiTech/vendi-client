import { useGetUsers } from '@/lib/api';
import { createTableProps, DataTable } from '@/ui/organisms/DataTable';
import { useDeleteUserModal, useEditLoginModal, useResetPasswordModal } from '@/ui/organisms/Modals';

export const PartnerManagementTable = () => {
  const { data } = useGetUsers();

  const partners = data?.data.items ?? []
  
  const tableData = partners.map((item) => ({
    ...item,
    id: String(item.id),
    name: `${item.firstname} ${item.lastname}`,
  }));

  
  const [openDeleteConfirmationModal] = useDeleteUserModal();
  const [openResetPasswordModal] = useResetPasswordModal();
  const [openEditLoginModal, closeEditModal] = useEditLoginModal();

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

  const editLogin = (id: string) => {
    const partner = partners.find((item) => String(item.id) === id);
    
    if (!partner) return;
    
    openEditLoginModal({
      defaultValues: partner,
      onConfirm: () => console.log('login changed ' + partner.id),
      onDelete: () => deleteUser(id, closeEditModal),
      onResetPassword: () => resetPassword(closeEditModal),
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
      { name: 'Edit', fn: editLogin },
      { name: 'Reset password', fn: () => resetPassword() },
      { name: 'Delete', fn: deleteUser, critical: true },
    ],
  });

  return <DataTable {...tableProps} />;
};
