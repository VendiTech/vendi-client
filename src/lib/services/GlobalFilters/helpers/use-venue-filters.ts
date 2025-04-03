import { useGetPaginatedMachines } from '@/lib/api';
import { useMemo } from 'react';

const allVenue = {
  name: 'All venue',
  id: '0',
};

export const useVenueFilters = (searchTerm: string) => {
  const { data, fetchNextPage } = useGetPaginatedMachines(searchTerm);

  return useMemo(
    () => ({
      items: [
        allVenue,
        ...(data.map((item) => ({
          name: item.name,
          id: String(item.id),
        })) ?? []),
      ],
      fetchNextPage,
    }),
    [data, fetchNextPage],
  );
};
