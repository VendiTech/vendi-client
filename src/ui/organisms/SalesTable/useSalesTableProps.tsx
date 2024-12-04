import { useGetSalesQuantityByCategory } from '@/lib/api';
import { createTableProps } from '@/ui/organisms/DataTable';

export const useSalesTableProps = () => {
  const { data } = useGetSalesQuantityByCategory();

  const parsedData = (data?.data.items ?? []).map((item) => ({
    id: String(item.product_id),
    product: item.product_name,
    category: item.category_name,
    quantity: item.quantity,
  }));

  return createTableProps({
    data: parsedData,
    actionsHidden: true,
    columns: [
      { field: 'product', title: 'Product' },
      { field: 'category', title: 'Product category' },
      { field: 'quantity', title: 'Total amount' },
    ],
  });
};
