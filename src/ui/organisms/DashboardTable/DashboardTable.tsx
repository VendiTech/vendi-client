import { useGetSales, useGetSalesQuantityByCategory } from '@/lib/api';
import { parseDate } from '@/lib/helpers/parse-date';
import { createTableProps, TabsTable } from '@/ui/organisms/DataTable';
import { TableGrowthPercent } from '@/ui/atoms/GrowthPercent';


export const DashboardTable = () => {
  const { data: overviewData } = useGetSalesQuantityByCategory()
  const { data: salesData } = useGetSales();

  const parsedOverviewData = (overviewData?.data.items ?? []).map((item) => ({
    id: String(item.product_id),
    product: item.product_name,
    category: item.category_name,
    quantity: item.quantity,
    date: item.sale_date,
  }))
  
  const parsedSalesData = (salesData?.data.items ?? []).map((item) => ({
    id: String(item.id),
    product: item.product.name,
    category: `Category ${item.product.product_category_id}`,
    quantity: item.quantity,
    date: item.sale_date,
  }));
  
  const overviewTableProps = createTableProps({
    data: parsedOverviewData,
    columns: [
      { field: 'product', title: 'Product' },
      { field: 'category', title: 'Product category' },
      {
        field: 'quantity',
        title: 'Total quantity',
        render: (item) => (
          <TableGrowthPercent percent={item.quantity} />
        ),
      },
    ],
  })
  
  const salesTableProps = createTableProps({
    data: parsedSalesData,
    columns: [
      { field: 'product', title: 'Product' },
      { field: 'category', title: 'Product category' },
      {
        field: 'quantity',
        title: 'Number',
        render: (item) => (
          <TableGrowthPercent percent={item.quantity} />
        ),
      },
      { field: 'date', title: 'Date', render: (item) => parseDate(new Date(item.date)) },
    ],
  });

  return (
    <TabsTable
      tabs={[
        { title: 'Overview', tableProps: overviewTableProps },
        { title: 'Advertising', tableProps: salesTableProps },
        { title: 'Sales', tableProps: salesTableProps },
      ]}
    />
  );
};
