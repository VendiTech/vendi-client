import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { TooltipItem } from 'chart.js';
import { useGlobalFilters } from '@/lib/services/GlobalFilters';
import { getDisplayDatesInterval } from '@/lib/helpers/get-display-dates-interval';
import { DATE_FORMAT } from '@/lib/constants/date';
import { useGetQuantityPerProductOverTime } from '@/lib/api';
import { ChartCard } from '@/ui/molecules/ChartCard';
import { MultiLineChart } from '@/ui/atoms/MultiLineChart';
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

  const xLabelsCallback = (label: string | number) => {
    const showYear = !dayjs(dateFrom, DATE_FORMAT).isSame(dateTo, 'year');
    const showMonth = !dayjs(dateFrom, DATE_FORMAT).isSame(dateTo, 'month');

    const displayFormat = `${showYear ? 'YYYY-' : ''}${showMonth ? 'MM-' : ''}DD`;

    return dayjs(dateFrom, DATE_FORMAT)
      .subtract(-label, 'day')
      .format(displayFormat);
  };

  const tooltipTitleCallback = (tooltipItems: TooltipItem<'line'>[]) =>
    dayjs(dateFrom, DATE_FORMAT)
      .subtract(-tooltipItems[0].label, 'day')
      .format('MMM DD, YYYY');

  const tooltipFooterCallback = (tooltipItems: TooltipItem<'line'>[]) =>
    `${tooltipItems[0].dataset.label} sales`;

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
        xLabelsCallback={xLabelsCallback}
        tooltipTitleCallback={tooltipTitleCallback}
        tooltipFooterCallback={tooltipFooterCallback}
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
