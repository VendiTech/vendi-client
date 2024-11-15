import dayjs, { Dayjs } from 'dayjs';
import { ImpressionDetailSchema } from '@/lib/generated/api';

type MonthlyData = {
  label: string;
  values: (number | null)[];
  month: Dayjs;
};

const adjustMonthlyData = (data: MonthlyData[]): MonthlyData[] =>
  data.map((item) => {
    let firstDayAsDayOfWeekIndex: number = dayjs(new Date(item.month.year(), item.month.month(), 1)).day()
    if (firstDayAsDayOfWeekIndex === 0) {
      firstDayAsDayOfWeekIndex = 7
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

export const splitByMonth = (data: ImpressionDetailSchema[]): MonthlyData[] => {
  const result: MonthlyData[] = [];

  const uniqueYears = Array.from(
    new Set(data.map((item) => dayjs(item.date).year())),
  );

  const multipleYears = uniqueYears.length > 1;

  const groupedData: Record<string, ImpressionDetailSchema[]> = data.reduce(
    (acc, item) => {
      const monthKey = dayjs(item.date).format('YYYY-MM');
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(item);
      return acc;
    },
    {} as Record<string, ImpressionDetailSchema[]>,
  );

  for (const [monthKey, items] of Object.entries(groupedData)) {
    const currentMonth = dayjs(monthKey);
    const lastDateOfMonth = currentMonth.endOf('month');

    const daysInMonth = dayjs(monthKey).daysInMonth();
    const month = dayjs(monthKey).format('MMM');
    const year = dayjs(monthKey).format('YYYY');

    const label = multipleYears ? `${month} ${year}` : month;

    const values: (number | null)[] = new Array(daysInMonth).fill(0);

    items.forEach(({ date, total_impressions }) => {
      const day = dayjs(date).date();
      
      values[day - 1] = dayjs(date).isAfter(dayjs()) ? null : +total_impressions;
    });

    result.push({
      label,
      values,
      month: lastDateOfMonth,
    });
  }

  return adjustMonthlyData(result);
};
