import { useGetMachinesByGeography } from '@/lib/api';
import { useMemo } from 'react';

export const useRegionFilters = (searchTerm: string) => {
  const { data, fetchNextPage } = useGetMachinesByGeography(searchTerm);

  const regionFilters = useMemo(
    () =>
      (data ?? []).map((region) => ({
        id: region.geography.id,
        name: region.geography.name,
        children: region.machines.map((machine) => ({
          id: machine.id,
          name: machine.name,
        })),
      })),
    [data],
  );

  return { regionFilters, fetchNextRegions: fetchNextPage };
};
