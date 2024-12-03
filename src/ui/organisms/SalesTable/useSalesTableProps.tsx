import { useGetProductsCategories, useGetSales } from '@/lib/api';
import { parseDate } from '@/lib/helpers/parse-date';
import { createTableProps } from '@/ui/organisms/DataTable';
import { TableGrowthPercent } from '@/ui/atoms/GrowthPercent';

export const useSalesTableProps = () => {
  const { data: salesData } = useGetSales();
  const { data: categories } = useGetProductsCategories();

  const parsedSalesData = (salesData?.data.items ?? []).map((item) => ({
    id: String(item.id),
    product: item.product.name,
    category: categories?.data.items.find(
      (category) => item.product.product_category_id === category.category_id,
    )?.category_name,
    quantity: item.quantity,
    date: item.sale_date,
  }));

  return createTableProps({
    data: parsedSalesData,
    columns: [
      { field: 'product', title: 'Product' },
      { field: 'category', title: 'Product category' },
      {
        field: 'quantity',
        title: 'Number',
        render: (item) => <TableGrowthPercent percent={item.quantity} />,
      },
      {
        field: 'date',
        title: 'Date',
        render: (item) => parseDate(new Date(item.date)),
      },
    ],
  });
};
