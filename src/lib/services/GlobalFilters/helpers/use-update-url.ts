import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export const useUpdateUrl = () => {
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (params: URLSearchParams) => {
      const queryString = params.toString();
      const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(updatedPath);
    },
    [pathname, router],
  );
};
