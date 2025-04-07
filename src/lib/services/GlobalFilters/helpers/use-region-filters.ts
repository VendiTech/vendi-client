import { useGetMachinesByGeography } from '@/lib/api';
import { useMemo } from 'react';

const allRegions = {
  name: 'United Kingdom',
  id: '0',
  children: [],
};

export const useRegionFilters = (searchTerm: string) => {
  const { data, fetchNextPage } = useGetMachinesByGeography(searchTerm);

  const regionFilters = useMemo(
    () => [
      allRegions,
      ...(data ?? []).map((region) => ({
        id: region.geography.id,
        name: region.geography.name,
        children: region.machines.map((machine) => ({
          id: machine.id,
          name: machine.name,
        })),
      })),
    ],
    [data],
  );

  return { regionFilters, fetchNextRegions: fetchNextPage };
};
