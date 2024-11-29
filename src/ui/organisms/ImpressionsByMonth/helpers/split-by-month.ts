import dayjs, { Dayjs } from 'dayjs';
import { TimeFrameImpressionsSchema } from '@/lib/generated/api';

type MonthlyData = {
  label: string;
  values: (number | null)[];
  month: Dayjs;
};

const adjustMonthlyData = (data: MonthlyData[]): MonthlyData[] =>
  data.map((item) => {
    let firstDayAsDayOfWeekIndex: number = dayjs(
      new Date(item.month.year(), item.month.month(), 1),
    ).day();
    if (firstDayAsDayOfWeekIndex === 0) {
      firstDayAsDayOfWeekIndex = 7;
    }

    const adjustedValues = [
      ...Array(firstDayAsDayOfWeekIndex - 1).fill(null),
      ...item.values,
    ];

    return {
      ...item,
      values: adjustedValues,
    };
  });

export const splitByMonth = (
  data: TimeFrameImpressionsSchema[],
): MonthlyData[] => {
  const result: MonthlyData[] = [];

  const groupedData: Record<string, TimeFrameImpressionsSchema[]> = data.reduce(
    (acc, item) => {
      const monthKey = dayjs(item.time_frame).format('YYYY-MM');
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(item);
      return acc;
    },
    {} as Record<string, TimeFrameImpressionsSchema[]>,
  );

  for (const [monthKey, items] of Object.entries(groupedData)) {
    const currentMonth = dayjs(monthKey);
    const lastDateOfMonth = currentMonth.endOf('month');

    const daysInMonth = dayjs(monthKey).daysInMonth();

    const label = dayjs(monthKey).format('MMM YYYY');

    const values: number[] = new Array(daysInMonth).fill(undefined);

    items.forEach(({ time_frame, impressions }) => {
      const day = dayjs(time_frame).date();

      values[day - 1] = +impressions;
    });

    result.push({
      label,
      values,
      month: lastDateOfMonth,
    });
  }

  return adjustMonthlyData(result);
};
