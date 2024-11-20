import { useGetGeographies } from '@/lib/api';
import { useMemo } from 'react';

const allRegions = {
  name: 'United Kingdom',
  id: '0',
};

export const useRegionFilters = () => {
  const { data } = useGetGeographies();

  return useMemo(() => [allRegions, ...(data?.data.items ?? [])], [data]);
};
