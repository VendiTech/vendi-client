import dayjs from 'dayjs';
import { ImpressionDetailSchemaOutput } from '@/lib/generated/api';

type MonthlyData = {
  label: string;
  values: number[];
};

export const splitByMonth = (data: ImpressionDetailSchemaOutput[]): MonthlyData[] => {
  const result: MonthlyData[] = [];

  const uniqueYears = Array.from(
    new Set(data.map(item => dayjs(item.date).year()))
  );

  const multipleYears = uniqueYears.length > 1;

  const groupedData: Record<string, ImpressionDetailSchemaOutput[]> = data.reduce((acc, item) => {
    const monthKey = dayjs(item.date).format('YYYY-MM');
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(item);
    return acc;
  }, {} as Record<string, ImpressionDetailSchemaOutput[]>);

  for (const [monthKey, items] of Object.entries(groupedData)) {
    const daysInMonth = dayjs(monthKey).daysInMonth();
    const month = dayjs(monthKey).format('MMM');
    const year = dayjs(monthKey).format('YYYY');

    const label = multipleYears ? `${month} ${year}` : month;

    const values: number[] = new Array(daysInMonth).fill(0);

    items.forEach(({ date, total_impressions }) => {
      const day = dayjs(date).date();
      values[day - 1] = +total_impressions;
    });

    result.push({
      label,
      values,
    });
  }

  return result;
};
