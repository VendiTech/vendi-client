import { useGetMachinesByGeography } from '@/lib/api';
import { useMemo } from 'react';

const allRegions = {
  name: 'United Kingdom',
  id: '0',
  children: [],
};

export const useRegionFilters = () => {
  const { data } = useGetMachinesByGeography();

  return useMemo(() => [allRegions, ...(data ?? []).map((region) => ({
    id: region.geography.id,
    name: region.geography.name,
    children: region.machines.map((machine) => ({
      id: machine.id,
      name: machine.name,
    })),
  }))], [data]);
};
