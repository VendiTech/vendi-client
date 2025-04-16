import {
  useAttachAllMachines,
  useAttachAllProducts,
  useGetUsers,
  useGetUsersCompanyLogos,
} from '@/lib/api';
import { parseDate } from '@/lib/helpers/parse-date';
import { createTableProps, DataTable } from '@/ui/organisms/DataTable';
import { CompanyLogo } from '@/ui/atoms/CompanyLogo';
import { useUpdateLoginModal } from './modals/UpdateLoginModal';
import { useDeleteUserModal } from './modals/DeleteLoginModal';
import { useResetPasswordModal } from './modals/ResetPasswordModal';

type Props = {
  variant?: 'accounts' | 'partner management';
};

export const PartnerManagementTable = ({
  variant = 'partner management',
}: Props) => {
  const { data } = useGetUsers(variant === 'partner management');
  const { data: companyLogos } = useGetUsersCompanyLogos();
  const { mutateAsync: attachAllMachines } = useAttachAllMachines();
  const { mutateAsync: attachAllProducts } = useAttachAllProducts();

  const partners = data?.data.items ?? [];

  const tableData = partners.map((item) => ({
    ...item,
    id: String(item.id),
    name: `${item.firstname} ${item.lastname}`,
    functions: item.role,
    logo: companyLogos?.data.items.find((logo) => logo.user_id === item.id)
      ?.company_logo_image,
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
      onConfirm: () => closeUpdateModal(),
      onDelete: () => deleteUser(id, closeUpdateModal),
      onResetPassword: () => resetPassword(id, closeUpdateModal),
    });
  };

  const tableProps = createTableProps({
    data: tableData,
    columns: [
      {
        field: 'logo',
        title: '',
        render: (user: (typeof tableData)[0]) => {
          return user.logo ? <CompanyLogo src={user.logo} /> : '';
        },
        sortDisabled: true,
      },
      { field: 'name', title: 'Name' },
      variant === 'partner management'
        ? { field: 'email', title: 'Email' }
        : null,
      variant === 'accounts'
        ? {
            field: 'id',
            title: 'User ID',
          }
        : null,
      variant === 'accounts' ? { field: 'functions', title: 'Function' } : null,
      {
        field: 'permissions',
        title: 'Permissions',
        render: (user: (typeof tableData)[0]) => user.permissions.join(', '),
      },
      variant === 'accounts'
        ? {
            field: 'last_logged_in',
            title: 'Last logged in',
            render: (item: (typeof tableData)[0]) =>
              item.last_logged_in
                ? parseDate(new Date(item.last_logged_in))
                : 'N/A',
          }
        : null,
    ].filter(Boolean) as Parameters<typeof createTableProps>[0]['columns'],
    menuActions: [
      { name: 'Edit', fn: updateLogin },
      { name: 'Reset password', fn: resetPassword },
      { name: 'Attach all machines', fn: (id) => attachAllMachines(+id) },
      { name: 'Attach all products', fn: (id) => attachAllProducts(+id) },
      { name: 'Delete', fn: deleteUser, critical: true },
    ],
  });

  return <DataTable {...tableProps} />;
};
