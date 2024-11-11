import { Routes } from '@/lib/constants/routes';
import DashboardIcon from '@/assets/icons/Grid.svg';
import SalesIcon from '@/assets/icons/BadgeDollar.svg';
import AdvertisingIcon from '@/assets/icons/Bullhorn.svg';
import ComparisonIcon from '@/assets/icons/ChartSimple.svg';
import ExportIcon from '@/assets/icons/ExportFilled.svg';

export const links = [
  { title: 'Dashboard', Icon: DashboardIcon, href: Routes.Dashboard },
  { title: 'Sales', Icon: SalesIcon, href: Routes.Sales },
  { title: 'Advertising', Icon: AdvertisingIcon, href: Routes.Advertising },
  { title: 'Comparison', Icon: ComparisonIcon, href: Routes.Comparison },
  { title: 'Export', Icon: ExportIcon, href: Routes.ExportData },
];
