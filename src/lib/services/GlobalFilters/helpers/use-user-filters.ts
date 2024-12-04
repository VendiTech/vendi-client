import { useGetUsers } from '@/lib/api';
import { useMemo } from 'react';

const allUsers = {
  id: '0',
  name: 'All users',
};

export const useUserFilters = () => {
  const { data } = useGetUsers();

  return useMemo(
    () => [
      allUsers,
      ...(data?.data.items.map((item) => ({
        id: String(item.id),
        name: `${item.firstname} ${item.lastname}`,
      })) ?? []),
    ],
    [data],
  );
};
