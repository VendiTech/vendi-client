import { useGetAccountData } from '@/lib/api';

const BASE_PATH = '/icons/partners/'

export const useBannerLogoPath = () => {
  const { data } = useGetAccountData()

  const companyName = data?.data.company_name ?? 'Vendi'
  
  const iconPath = BASE_PATH + companyName + '.png'
  const fallbackPath = BASE_PATH + 'Vendi.png'
  
  return { iconPath, fallbackPath }
}