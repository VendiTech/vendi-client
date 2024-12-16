import { useGetAccountData } from '@/lib/api';

const BASE_PATH = '/icons/partners/';

const getIconPath = (companyName: string) => ({
  iconPath: BASE_PATH + companyName + '.png',
  fallbackPath: BASE_PATH + 'Vendi.png',
});

export const useBannerLogoPath = () => {
  const { data } = useGetAccountData();

  const companyName = data?.data.company_name?.trim().toLowerCase() ?? 'vendi';

  switch (companyName) {
    case 'elux':
      return getIconPath('Elux');

    case 'golffang':
    case 'golf fang':
      return getIconPath('GolfFang');

    case 'marston':
    case 'marstons':
    case "marston's":
      return getIconPath('Marstons');

    case 'nordicspirit':
    case 'nordic spirit':
    case 'nordic':
      return getIconPath('NordicSpirit');

    case 'vendi':
    default:
      return getIconPath('Vendi');
  }
};
