import dayjs from 'dayjs';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { getDisplayDatesInterval } from '@/lib/helpers/get-display-dates-interval';
import { useGetQuantityPerProductOverTime } from '@/lib/api';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { MultiLineChart } from '@/ui/atoms/MultiLineChart';
import { useEffect, useMemo, useState } from 'react';
import { BaseSelect } from '@/ui/atoms/Select';
import { ChartLegend } from '@/ui/atoms/ChartLegend';
import { parseFrequencyData } from '../helpers/parse-frequency-data';

export const FrequencyOfTotalSales = () => {
  const { data, isLoading, isError } = useGetQuantityPerProductOverTime();

  const { dateFrom, dateTo, product } = useGlobalFilters();

  const dataWithColors = useMemo(
    () =>
      parseFrequencyData(
        data?.data.items ?? [],
        dayjs(dateFrom),
        dayjs(dateTo),
      ),
    [data, dateFrom, dateTo],
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

  const totalProductsSold = chartData.reduce(
    (acc, curr) =>
      acc +
      curr.values.reduce(
        (valuesAcc, currentValue) => valuesAcc + currentValue,
        0,
      ),
    0,
  );

  const subtitle = `You sold ${totalProductsSold} products ${getDisplayDatesInterval(dateFrom, dateTo)}`;

  return (
    <ChartCard
      title={'Freq. of total sales'}
      subtitle={subtitle}
      isLoading={isLoading}
      isError={isError}
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
        xLabelsCallback={(label) => String(label)}
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
