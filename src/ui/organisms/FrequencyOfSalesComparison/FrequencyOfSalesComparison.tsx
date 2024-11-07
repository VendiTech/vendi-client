import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { ActionsMenu } from '@/ui/molecules/MenuButton';
import { MultiBarChart } from '@/ui/atoms/MultiBarChart';
import { BaseSelect } from '@/ui/atoms/Select';

const data = [
  { label: 'January', values: [31, 27, 12] },
  { label: 'February', values: [31, 27, 12] },
  { label: 'March', values: [31, 27, 12] },
  { label: 'April', values: [34, 47, 22] },
  { label: 'May', values: [33, 28, 5] },
  { label: 'June', values: [24, 19, 0] },
  { label: 'July', values: [17, 31, 8] },
  { label: 'August', values: [40, 25, 15] },
  { label: 'September', values: [40, 25, 15] },
  { label: 'October', values: [40, 25, 15] },
  { label: 'November', values: [40, 25, 15] },
  { label: 'December', values: [40, 25, 15] },
];

const products = ['Mint', 'Spearmint', 'Watermelon'];

export const FrequencyOfSalesComparison = () => {
  const [selectedMonths, setSelectedMonths] = useState(
    data.map((item) => item.label),
  );
  const [selectedCategories, setSelectedCategories] = useState(products);

  return (
    <ChartCard
      title={'Frequency of Sales'}
      subtitle={'Lorem ipsum'}
      actions={
        <ActionsMenu
          actions={
            <Box
              sx={{
                px: 1,
                py: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
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
                minWidth={200}
                value={selectedCategories}
                onChange={(e) => setSelectedCategories(e.target.value as string[])}
                options={products.map((item) => ({ key: item, value: item }))}
              />

              <BaseSelect
                fullWidth
                multiple
                minWidth={200}
                value={selectedMonths}
                onChange={(e) => setSelectedMonths(e.target.value as string[])}
                options={data.map((item) => ({
                  key: item.label,
                  value: item.label,
                }))}
              />
            </Box>
          }
        />
      }>
      <MultiBarChart
        categories={products.filter((item) =>
          selectedCategories.find((category) => item === category),
        )}
        data={data.filter((item) =>
          selectedMonths.find((month) => item.label === month),
        )}
      />
    </ChartCard>
  );
};
