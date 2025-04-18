import { Routes } from '@/lib/constants/routes';
import DashboardIcon from '@/assets/icons/Grid.svg';
import SalesIcon from '@/assets/icons/BadgeDollar.svg';
import AdvertisingIcon from '@/assets/icons/Bullhorn.svg';
import ComparisonIcon from '@/assets/icons/ChartSimple.svg';
import ExportIcon from '@/assets/icons/ExportFilled.svg';
import UploadIcon from '@/assets/icons/Upload.svg';
import AdminIcon from '@/assets/icons/Person.svg';
import { useGetAccountData } from '@/lib/api';
import { RoleEnum } from '@/lib/generated/api';

export const useNavLinks = () => {
  const baseLinks = [
    { title: 'Dashboard', Icon: DashboardIcon, href: Routes.Dashboard },
    { title: 'Sales', Icon: SalesIcon, href: Routes.Sales },
    { title: 'Advertising', Icon: AdvertisingIcon, href: Routes.Advertising },
    { title: 'Comparison', Icon: ComparisonIcon, href: Routes.Comparison },
    { title: 'Export', Icon: ExportIcon, href: Routes.ExportData },
  ];

  const { data: user } = useGetAccountData();

  if (user?.data.role === RoleEnum.Admin) {
    baseLinks.push({
      title: 'Upload',
      Icon: UploadIcon,
      href: Routes.UploadData,
    });
    baseLinks.push({
      title: 'Admin panel',
      Icon: AdminIcon,
      href: Routes.Admin,
    });
  }

  return baseLinks;
};
