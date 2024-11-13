import { useGetGeographies } from '@/lib/api';
import { GeographyDetailSchema } from '@/lib/generated/api';

const allRegions: GeographyDetailSchema = {
  name: 'United Kingdom',
  postcode: null,
  id: 0,
};

export const useRegionFilters = (): GeographyDetailSchema[] => {
  const { data } = useGetGeographies();

  return data ? [allRegions, ...data.data.items] : [allRegions];
};
