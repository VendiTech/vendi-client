import { useGetVenue } from '@/lib/api';
import { useMemo } from 'react';

const allVenue = {
  name: 'All venue',
  id: '0',
};

export const useVenueFilters = () => {
  const { data } = useGetVenue();

  return useMemo(
    () => [
      allVenue,
      ...(data?.data.items.map((item) => ({
        name: item.venue,
        id: item.venue,
      })) ?? []),
    ],
    [data],
  );
};
