import { parseDate } from '@/lib/helpers/parse-date';
import { createTableProps, useSort } from '@/ui/organisms/DataTable';
import { useGetProductsQuantityByVenue } from '../api/useGetProductsQuantityByVenue';

export const useSalesOverviewTableProps = (filterByProduct = false) => {
  const { orderBy, orderDirection, getOnSort } = useSort();

  const { data, total, page, fetchNext } = useGetProductsQuantityByVenue({
    filterByProduct,
    orderBy,
    orderDirection,
  });

  const parsedData = (data?.data.items ?? []).map((item) => ({
    ...item,
    id: item.product_name + item.venue,
  }));

  return createTableProps({
    data: parsedData,
    actionsHidden: true,
    total,
    page,
    fetchNext,
    columns: [
      { field: 'venue', title: 'Venue', onSort: getOnSort() },
      { field: 'product_name', title: 'Product', onSort: getOnSort() },
      { field: 'quantity', title: 'Amount', onSort: getOnSort() },
      {
        field: 'sale_date',
        title: 'Date',
        onSort: getOnSort(),
        render: (item) => parseDate(new Date(item.sale_date), false),
      },
    ],
  });
};
