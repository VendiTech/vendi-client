import { useGetGeographies } from '@/lib/api';
import { GeographyDetailSchema } from '@/lib/generated/api';
import { useMemo } from 'react';

const allRegions: GeographyDetailSchema = {
  name: 'United Kingdom',
  postcode: null,
  id: 0,
};

export const useRegionFilters = (): GeographyDetailSchema[] => {
  const { data } = useGetGeographies();

  return useMemo(() => [allRegions, ...(data?.data.items ?? [])], [data]);
};
