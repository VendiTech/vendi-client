import { parseDate } from '@/lib/helpers/parse-date';
import { createTableProps } from '@/ui/organisms/DataTable';
import { useGetProductsQuantityByVenue } from '../api/useGetProductsQuantityByVenue';

export const useSalesOverviewTableProps = (filterByProduct = false) => {
  const { data, total, page, fetchNext } =
    useGetProductsQuantityByVenue(filterByProduct);

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
      { field: 'venue', title: 'Venue' },
      { field: 'product_name', title: 'Product' },
      { field: 'quantity', title: 'Amount' },
      {
        field: 'sale_date',
        title: 'Date',
        render: (item) => parseDate(new Date(item.sale_date), false),
      },
    ],
  });
};
