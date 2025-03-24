import { useGetProductsCategories } from '@/lib/api/hooks/products/useGetProductsCategories';
import { useMemo } from 'react';
import { useGetAccountData } from '@/lib/api';

const allProducts = {
  id: '0',
  name: 'All',
  children: [],
};

export const useProductFilters = () => {
  const { data: productCategories } = useGetProductsCategories();
  const { data: products } = useGetAccountData();

  return useMemo(
    () => [
      allProducts,
      ...(productCategories?.data.items.map((category) => ({
        id: category.category_id,
        name: category.category_name,
        children: (products?.data.products ?? []).filter(
          (product) => product.product_category_id === category.category_id,
        ),
      })) ?? []),
    ],
    [productCategories, products],
  );
};
