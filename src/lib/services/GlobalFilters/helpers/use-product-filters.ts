import { useGetProductsCategories } from '@/lib/api/hooks/products/useGetProductsCategories';
import { useMemo } from 'react';
import { useGetAccountData, useGetProducts } from '@/lib/api';

const allProducts = {
  id: '0',
  name: 'All',
  children: [],
};

export const useProductFilters = () => {
  const { data: productCategories } = useGetProductsCategories();
  const { data: accountData } = useGetAccountData();
  const { data: products } = useGetProducts();

  return useMemo(() => {
    const isAdmin = accountData?.data.role === 'admin';

    const productItems = isAdmin
      ? (products?.data.items ?? [])
      : (accountData?.data.products ?? []);

    return [
      allProducts,
      ...(productCategories?.data.items.map((category) => ({
        id: category.category_id,
        name: category.category_name,
        children: productItems.filter(
          (product) => product.product_category_id === category.category_id,
        ),
      })) ?? []),
    ];
  }, [products, productCategories, accountData]);
};
