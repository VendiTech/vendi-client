import { freqOfTotalSales } from '@/assets/mocks/freq-of-total-sales';
import { chartColors } from '@/assets/styles/variables';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { MultiLineChart } from '@/ui/atoms/MultiLineChart';
import { useGlobalFilters } from '@/ui/organisms/GlobalFilters';
import { useEffect, useMemo, useState } from 'react';
import { BaseSelect } from '@/ui/atoms/Select';
import { ChartLegend } from '@/ui/atoms/ChartLegend';

export const FrequencyOfTotalSales = () => {
  const { product } = useGlobalFilters();

  const dataWithColors = useMemo(
    () =>
      freqOfTotalSales.map((item, i) => ({
        ...item,
        color: chartColors[i],
      })),
    [],
  );

  const [selectedProducts, setSelectedProducts] = useState(
    dataWithColors
      .filter((item) => !product || item.label === product)
      .map((item) => item.label),
  );

  useEffect(() => {
    setSelectedProducts(
      dataWithColors
        .filter((item) => !product || item.label === product)
        .map((item) => item.label),
    );
  }, [product, dataWithColors]);

  const chartData = dataWithColors.filter((item) =>
    selectedProducts.find((selectedProduct) => selectedProduct === item.label),
  );

  return (
    <ChartCard
      title={'Freq. of total sales'}
      subtitle={'You sold 924 products this month.'}
      actions={
        <BaseSelect
          showInput={false}
          value={selectedProducts}
          onChange={(e) => setSelectedProducts(e.target.value as string[])}
          multiple
          options={dataWithColors.map((item) => ({
            key: item.label,
            value: item.label,
          }))}
        />
      }>
      <MultiLineChart
        data={chartData}
        xLabelsCallback={(label) => {
          if (label === 5) return '01-11';
          if (label === 13) return '12-18';
          if (label === 21) return '19-25';
          if (label === 27) return '26-31';
        }}
      />

      <ChartLegend
        legend={chartData.map((item) => ({
          title: item.label,
          color: item.color,
        }))}
      />
    </ChartCard>
  );
};
