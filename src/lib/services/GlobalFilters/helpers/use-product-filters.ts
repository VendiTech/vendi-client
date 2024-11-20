import { useGetProducts } from '@/lib/api/hooks/products/useGetProducts';
import { useMemo } from 'react';

const allProducts = {
  id: '0',
  name: 'All'
}

export const useProductFilters = () => {
  const {data} = useGetProducts() 

  return useMemo(() => [allProducts, ...data?.data.items.map((item) => ({
    id: item.category_id,
    name: item.category_name
  })) ?? []], [data])
}