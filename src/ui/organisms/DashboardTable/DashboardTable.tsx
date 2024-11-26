import { useGetSales } from '@/lib/api';
import { parseDate } from '@/lib/helpers/parse-date';
import { createTableProps, TabsTable } from '@/ui/organisms/DataTable';
import { GrowthPercent } from '@/ui/atoms/GrowthPercent';

export const DashboardTable = () => {
  const { data: salesData } = useGetSales();

  const parsedOverviewData = (salesData?.data.items ?? []).map((item) => ({
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
        title: 'Number',
        render: (item) => (
          <GrowthPercent
            sx={{
              gap: 1,
              minWidth: 52,
              fontWeight: 'inherit',
            }}
            percent={item.quantity}
            colorizeText={false}
            arrowPosition={'right'}
            showPercent={false}
          />
        ),
      },
      { field: 'date', title: 'Date', render: (item) => parseDate(new Date(item.date)) },
    ],
  });

  return (
    <TabsTable
      tabs={[
        { title: 'Overview', tableProps: overviewTableProps },
        { title: 'Advertising', tableProps: overviewTableProps },
        { title: 'Sales', tableProps: overviewTableProps },
      ]}
    />
  );
};
