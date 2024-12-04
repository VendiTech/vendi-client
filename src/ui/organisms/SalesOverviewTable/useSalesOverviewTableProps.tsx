import { createTableProps } from '@/ui/organisms/DataTable';
import { useGetSalesQuantityByCategory } from '@/lib/api';

export const useSalesOverviewTableProps = () => {
  const { data: overviewData } = useGetSalesQuantityByCategory();

  const parsedOverviewData = (overviewData?.data.items ?? []).map((item) => ({
    id: String(item.product_id),
    product: item.product_name,
    category: item.category_name,
    quantity: item.quantity,
    date: item.sale_date,
  }));

  return createTableProps({
    data: parsedOverviewData,
    actionsHidden: true,
    columns: [
      { field: 'product', title: 'Product' },
      { field: 'category', title: 'Product category' },
      { field: 'quantity', title: 'Total quantity' },
    ],
  });
};
