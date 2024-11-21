import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { TooltipItem } from 'chart.js';
import { Box } from '@mui/material';
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

  const validDateFrom = useMemo(
    () =>
      dayjs(dateFrom).isValid()
        ? dayjs(dateFrom)
        : dayjs().subtract(1, 'month'),
    [dateFrom],
  );
  const validDateTo = useMemo(
    () => (dayjs(dateTo).isValid() ? dayjs(dateTo) : dayjs()),
    [dateTo],
  );

  const dataWithColors = useMemo(
    () =>
      parseFrequencyData(data?.data.items ?? [], validDateFrom, validDateTo),
    [data, validDateFrom, validDateTo],
  );

  const [selectedProducts, setSelectedProducts] = useState(
    dataWithColors
      .filter((item) => !product || product.includes(item.id))
      .map((item) => item.id),
  );

  useEffect(() => {
    setSelectedProducts(
      dataWithColors
        .filter((item) => !product || product.includes(item.id))
        .map((item) => item.id),
    );
  }, [product, dataWithColors]);

  const chartData = dataWithColors.filter((item) =>
    selectedProducts.find((selectedProduct) => selectedProduct === item.id),
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
    const showYear = !dayjs(validDateFrom, DATE_FORMAT).isSame(
      validDateTo,
      'year',
    );
    const showMonth = !dayjs(validDateFrom, DATE_FORMAT).isSame(
      validDateTo,
      'month',
    );

    const displayFormat = `${showYear ? 'YYYY-' : ''}${showMonth ? 'MM-' : ''}DD`;

    return dayjs(validDateFrom, DATE_FORMAT)
      .subtract(-label, 'day')
      .format(displayFormat);
  };

  const tooltipTitleCallback = (tooltipItems: TooltipItem<'line'>[]) =>
    dayjs(validDateFrom, DATE_FORMAT)
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
          onChange={(e) => setSelectedProducts((e.target.value as string[]))}
          multiple
          options={dataWithColors.map((item) => ({
            key: String(item.id),
            value: String(item.id),
            displayValue: item.label
          }))}
        />
      }>
      <Box sx={{ maxHeight: 250, width: '100%', height: '100%', display: 'flex' }}>
        <MultiLineChart
          data={chartData}
          xLabelsCallback={xLabelsCallback}
          tooltipTitleCallback={tooltipTitleCallback}
          tooltipFooterCallback={tooltipFooterCallback}
        />
      </Box>

      <ChartLegend
        legend={chartData.map((item) => ({
          title: item.label,
          color: item.color,
        }))}
      />
    </ChartCard>
  );
};
