import dayjs, { Dayjs } from 'dayjs';
import { chartColors } from '@/assets/styles/variables';
import { DATE_FORMAT } from '@/lib/constants/date';
import { CategoryTimeFrameSalesSchema } from '@/lib/generated/api';

type ParsedData = {
  label: string;
  values: number[];
  color: string;
};

export const parseFrequencyData = (
  data: CategoryTimeFrameSalesSchema[],
  startDate: Dayjs,
  endDate: Dayjs,
): ParsedData[] => {
  const daysCount = endDate.diff(startDate, 'day') + 1;
  
  const dateRange = Array.from({ length: daysCount }, (_, i) =>
    startDate.add(i, 'day').format(DATE_FORMAT),
  );

  return data.map((category, i) => {
    const values = dateRange.map((date) => {
      const sale = category.sale_range.find(
        (item) => dayjs(item.time_frame).format(DATE_FORMAT) === date,
      );
      return sale ? sale.quantity : 0;
    });

    return {
      label: category.category_name,
      values,
      color: chartColors[i],
    };
  });
};