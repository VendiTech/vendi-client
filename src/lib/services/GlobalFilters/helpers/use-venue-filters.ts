import { useGetPaginatedMachines } from '@/lib/api';
import { useMemo } from 'react';

const allVenue = {
  name: 'All venue',
  id: '0',
};

export const useVenueFilters = (searchTerm: string) => {
  const { data, fetchNextPage } = useGetPaginatedMachines(searchTerm);

  const flatItems = useMemo(
    () => data?.pages.map((page) => page.data.items.flat()).flat() ?? [],
    [data],
  );

  return useMemo(
    () => ({
      items: [
        allVenue,
        ...(flatItems.map((item) => ({
          name: item.name,
          id: String(item.id),
        })) ?? []),
      ],
      fetchNextPage,
    }),
    [flatItems, fetchNextPage],
  );
};
