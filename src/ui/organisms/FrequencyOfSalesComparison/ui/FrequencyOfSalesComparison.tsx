import { useEffect, useMemo, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { useGetQuantityPerProductOverTime } from '@/lib/api';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { getDisplayDatesInterval } from '@/lib/helpers/get-display-dates-interval';
import { chartColors } from '@/assets/styles/variables';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { ActionsMenu } from '@/ui/molecules/MenuButton';
import { MultiBarChart } from '@/ui/atoms/MultiBarChart';
import { BaseSelect } from '@/ui/atoms/Select';
import { parseSalesData } from '../helpers/split-by-month';

export const FrequencyOfSalesComparison = () => {
  const {
    data: salesData,
    isLoading,
    isError,
  } = useGetQuantityPerProductOverTime();

  const { dateFrom, dateTo } = useGlobalFilters();

  const items = useMemo(() => salesData?.data.items ?? [], [salesData]);
  const products = useMemo(
    () =>
      items.map((item, i) => ({
        title: item.category_name,
        color: chartColors[i],
      })),
    [items],
  );
  const data = useMemo(() => parseSalesData(items), [items]);

  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState(products);

  useEffect(() => {
    setSelectedCategories(products);
    setSelectedMonths(data.map((item) => item.label));
  }, [data, products]);

  const filteredProducts = products.filter((product) =>
    selectedCategories.find((item) => item.title === product.title),
  );

  const months = data.map((month) => month.label);

  const filteredData = data
    .map((month) => ({
      ...month,
      values: month.values.filter((item, i) =>
        filteredProducts.find(
          (filteredProduct) => filteredProduct.title === products[i].title,
        ),
      ),
    }))
    .filter((month) => selectedMonths.find((item) => month.label === item));

  const total = data.reduce(
    (acc, curr) =>
      acc +
      curr.values.reduce(
        (productAcc, productCurr) => productAcc + productCurr,
        0,
      ),
    0,
  );

  const subtitle = `You sold ${total} products ${getDisplayDatesInterval(dateFrom, dateTo)}`;

  return (
    <ChartCard
      title={'Frequency of Sales'}
      subtitle={subtitle}
      isLoading={isLoading}
      isError={isError || !total}
      actions={
        <ActionsMenu
          actions={
            <Stack
              spacing={1}
              sx={{
                px: 1,
                py: 2,
                maxWidth: 220,
              }}>
              <Typography
                variant={'sm-regular'}
                sx={{ color: 'var(--slate-500)', pb: 1 }}>
                Filters
              </Typography>

              <BaseSelect
                fullWidth
                multiple
                value={selectedCategories.map((item) => item.title)}
                onChange={(e) =>
                  setSelectedCategories(
                    products.filter((item) =>
                      (e.target.value as string[]).includes(item.title),
                    ),
                  )
                }
                options={products.map((item) => ({
                  key: item.title,
                  value: item.title,
                }))}
              />

              <BaseSelect
                fullWidth
                multiple
                showSearch
                value={selectedMonths}
                onChange={(e) => setSelectedMonths(e.target.value as string[])}
                options={months.map((item) => ({
                  key: item,
                  value: item,
                }))}
              />
            </Stack>
          }
        />
      }>
      <MultiBarChart categories={filteredProducts} data={filteredData} />
    </ChartCard>
  );
};
