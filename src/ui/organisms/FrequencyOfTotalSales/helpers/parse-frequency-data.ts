import dayjs, { Dayjs } from 'dayjs';
import { chartColors } from '@/assets/styles/variables';
import { DATE_FORMAT } from '@/lib/constants/date';
import { CategoryTimeFrameSalesSchema } from '@/lib/generated/api';

type ParsedData = {
  id: string;
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

  const sorted = [...data].sort((prev, curr) => prev.category_id - curr.category_id)
  
  return sorted
    .map((category, i) => {
      const values = dateRange.map((date) => {
        const sale = category.sale_range.find(
          (item) => dayjs(item.time_frame).format(DATE_FORMAT) === date,
        );
        return sale ? sale.quantity : 0;
      });

      return {
        id: String(category.category_id),
        label: category.category_name,
        values,
        color: chartColors[i],
      };
    });
};
