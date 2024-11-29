import { useGetProductsCategories } from '@/lib/api/hooks/products/useGetProductsCategories';
import { useMemo } from 'react';

const allProducts = {
  id: '0',
  name: 'All',
};

export const useProductFilters = () => {
  const { data } = useGetProductsCategories();

  return useMemo(
    () => [
      allProducts,
      ...(data?.data.items.map((item) => ({
        id: item.category_id,
        name: item.category_name,
      })) ?? []),
    ],
    [data],
  );
};
