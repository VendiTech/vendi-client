import { useGetSalesQuantityByCategory } from '@/lib/api';
import { parseDate } from '@/lib/helpers/parse-date';
import { createTableProps, useSort } from '@/ui/organisms/DataTable';

export const useSalesTableProps = (filterByProduct = false) => {
  const { orderBy, orderDirection, getOnSort } = useSort();

  const { data, total, page, fetchNext } = useGetSalesQuantityByCategory({
    orderBy,
    orderDirection,
    filterByProduct,
  });

  const parsedData = (data?.data.items ?? []).map((item) => ({
    id: String(item.product_id),
    product: item.product_name,
    category: item.category_name,
    quantity: item.quantity,
    date: item.sale_date,
  }));

  return createTableProps({
    data: parsedData,
    actionsHidden: true,
    total,
    page,
    fetchNext,
    columns: [
      { field: 'product', title: 'Product', onSort: getOnSort() },
      { field: 'category', title: 'Product category', onSort: getOnSort('product_category') },
      {
        field: 'quantity',
        title: 'Total amount',
        onSort: getOnSort('amount'),
      },
      {
        field: 'date',
        title: 'Date',
        render: (item) => parseDate(new Date(item.date), false),
        onSort: getOnSort(),
      },
    ],
  });
};
